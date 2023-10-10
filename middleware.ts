import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { parse } from "@lib/utils";
import { currentUser } from "@lib/auth";
import { APP_URL } from "@lib/constants";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    "/((?!api/auth/|api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt|manifest.json|icon-192x192.png|sw.js|workbox-*.js|android-chrome-512x512.png).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { domain, path, key, fullPath } = parse(req);

  // for public stats pages (e.g. upme.blog/stats/github, vercel.fyi/stats/roomGPT)
  if (key === "stats") {
    return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
  }

  if (path.startsWith("/workspace")) {
    const user = await currentUser(req);
    if (!user) return NextResponse.redirect(`${APP_URL}/login`);
    return NextResponse.next();
  }

  if (path.startsWith("/login") || path.startsWith("/register")) {
    const user = await currentUser(req);
    if (user) {
      return NextResponse.redirect(`${APP_URL}`);
    } else {
      return NextResponse.next();
    }
  }

  if (path == "/") {
    return NextResponse.next();
  }

  return NextResponse.json(
    { error: "Invalid requested file" },
    { status: 400 },
  );
}
