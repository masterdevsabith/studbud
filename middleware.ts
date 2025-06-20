import { NextRequest, NextResponse } from "next/server";

function extractSubdomain(request: NextRequest) {
  const url = request.url;
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (hostname === "localhost" || url.includes("127.0.0.1")) {
    return null;
  }

  //   if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
  //     const parts = hostname.split("---")[0];
  //   }

  if (
    rootDomain &&
    hostname !== rootDomain &&
    hostname.endsWith(`.${rootDomain}`)
  ) {
    return hostname.replace(`.${rootDomain}`, " ");
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // improved matcher for static files
};
