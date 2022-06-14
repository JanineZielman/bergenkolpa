import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/nl") {
    return NextResponse.redirect(new URL("/nl-nl", req.nextUrl));
  }

	if (pathname === "/en") {
    return NextResponse.redirect(new URL("/en-gb", req.nextUrl));
  }

	if (pathname === "/cn") {
    return NextResponse.redirect(new URL("/zh-cn", req.nextUrl));
  }

	if (pathname === "/zh") {
    return NextResponse.redirect(new URL("/zh-cn", req.nextUrl));
  }

  return NextResponse.next();
}