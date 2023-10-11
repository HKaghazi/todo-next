import nextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@lib/prisma";
import { sendEmail } from "emails";
import LoginLink from "emails/login-link";
import { isBlacklistedEmail } from "@lib/edge-config";
import WelcomeEmail from "emails/welcome-email";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const authOptions: NextAuthOptions = {
  // debug: true,
  providers: [
    EmailProvider({
      sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === "development") {
          console.info(`Login link: ${url}`);
          return;
        } else {
          sendEmail({
            email: identifier,
            subject: "Your Dub Login Link",
            react: LoginLink({ url, email: identifier }),
          });
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? ".koksa.ir" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  // pages: {
  //   error: "/login",
  // },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      // console.log({ user, account, profile });
      if (!user.email || (await isBlacklistedEmail(user.email))) {
        return false;
      }
      if (account?.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        });
        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && !userExists.name) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              // @ts-ignore - this is a bug in the types, `picture` is a valid on the `Profile` type
              image: profile?.picture,
            },
          });
        }
      }
      return true;
    },
    jwt: async ({ token, account, user, trigger }) => {
      // force log out banned users
      if (!token.email || (await isBlacklistedEmail(token.email))) {
        return {};
      }

      if (user) {
        token.user = user;
      }

      // refresh the user's data if they update their name / email
      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });
        if (refreshedUser) {
          token.user = refreshedUser;
        } else {
          return {};
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email as string;
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            name: true,
            createdAt: true,
          },
        });
        // only send the welcome email if the user was created in the last 10s
        // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
        if (
          user?.createdAt &&
          new Date(user.createdAt).getTime() > Date.now() - 10000
        ) {
          sendEmail({
            subject: "Welcome to Dub.co!",
            email,
            react: WelcomeEmail({
              email,
              name: user.name || null,
            }),
            marketing: true,
          });
        }
      }
    },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
