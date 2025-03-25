import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {

  const protectedRoutes = ["/create"];

  const path = req.nextUrl.pathname;

  
  if (protectedRoutes.includes(path) && !req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next(); 
});

export const config = {
  matcher: ["/create"], 
};
