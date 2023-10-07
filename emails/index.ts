import { nanoid } from "@lib/utils";
import { APP_NAME, APP_URL } from "@lib/constants";
import { ReactElement, JSXElementConstructor } from "react";
import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendEmail = async ({
  email,
  subject,
  react,
  marketing,
  test,
}: {
  email: string;
  subject: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
  test?: boolean;
}) => {
  if (!resend) {
    console.log("Resend is not configured correctly.");
    return Promise.resolve();
  }
  return resend.emails.send({
    from: marketing
      ? `Hafez from ${APP_NAME} <hafez@${APP_URL}>`
      : `${APP_NAME} <system@${APP_URL}>`,
    to: test ? "delivered@resend.dev" : email,
    subject,
    react,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  });
};
