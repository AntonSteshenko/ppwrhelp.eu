import { NextRequest, NextResponse } from "next/server";
import { preferredLocale } from "./i18n/locales";

export function proxy(request: NextRequest) {
  const locale = preferredLocale(request.headers.get("accept-language"));
  const destination = request.nextUrl.clone();
  destination.pathname = `/${locale}`;
  return NextResponse.redirect(destination);
}

export const config = { matcher: "/" };
