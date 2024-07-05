import { NextResponse } from 'next/server'
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
const { auth } = NextAuth(authConfig);
import { DEFAULT_AUTHENTICATED_REDIRECT, PUBLIC_ROUTES, LOGIN, ROOT } from "@/libs/routes";

export default auth((req) => {
  const { nextUrl } = req;
  
  if(nextUrl.pathname === '/'){
    return Response.redirect(new URL(LOGIN, nextUrl));
  }

  const isAuthenticated = !!req.auth;

  const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
    || nextUrl.pathname === ROOT);

  console.log({ isPublicRoute });

  if (isAuthenticated) {
    if(isPublicRoute){
      return Response.redirect(new URL(DEFAULT_AUTHENTICATED_REDIRECT, nextUrl));
    }
  }else{
    if(!isPublicRoute)
      return Response.redirect(new URL(LOGIN, nextUrl));
  }
  
  return NextResponse.next();
  
});
// This function can be marked `async` if using `await` inside
// export async function middleware(request) {

//   // console.log('request', auth)
//   return NextResponse.redirect(new URL('/login', request.url))
//   //return NextResponse.redirect(new URL('/login', request.url))
// }

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}