import { NextResponse } from 'next/server'
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
const { auth } = NextAuth(authConfig);
import { DEFAULT_AUTHENTICATED_REDIRECT, PUBLIC_ROUTES, LOGIN, ROOT,PROTECTED_SUB_ROUTES } from "@/libs/routes";

// export default auth((req) => {
//   const { nextUrl } = req;
  
//   if(nextUrl.pathname === '/'){
//     return Response.redirect(new URL(LOGIN, nextUrl));
//   }

//   const isAuthenticated = !!req.auth//Object.keys(req.auth.user).length === 0 ? false : true;

//   const isPublicRoute = (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
//     || nextUrl.pathname === ROOT);


//   if (isAuthenticated) {
//     if(isPublicRoute){
//       return Response.redirect(new URL(DEFAULT_AUTHENTICATED_REDIRECT, nextUrl));
//     }
//   }else{
//     if(!isPublicRoute)
//       return Response.redirect(new URL(LOGIN, nextUrl));
//   }
  
//   return NextResponse.next();
  
// });

// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
  
  const { nextUrl } = request;
  if(nextUrl.pathname === '/'){
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
  
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
  || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));
  console.log('isAuthenticated',isAuthenticated);
  
  // if(isAuthenticated && !isPublicRoute){
  //   return NextResponse.next();
  // }

  if (!isAuthenticated && !isPublicRoute){
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}