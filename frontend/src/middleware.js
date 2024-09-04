import { NextResponse } from 'next/server'
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
const { auth } = NextAuth(authConfig);
import { DEFAULT_AUTHENTICATED_REDIRECT, PUBLIC_ROUTES, LOGIN, ROOT,PROTECTED_SUB_ROUTES } from "@/libs/routes";

export default auth((req) => {
  const { nextUrl } = req;

  if(nextUrl.pathname === '/') return Response.redirect(new URL(LOGIN, nextUrl));

  const isAuthenticated = !!req.auth

  const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
    || nextUrl.pathname === ROOT);
  
  if(!isAuthenticated && !isPublicRoute){
    return Response.redirect(new URL(LOGIN, nextUrl));
  }

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}