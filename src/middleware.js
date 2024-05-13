import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { roleData } from "./utils/permission";

export const hasAdminRole = (currentUser) =>
  currentUser?.myrole?.some((role) => role.role === roleData.Admin);

export const hasBuyerRole = (currentUser) =>
  currentUser?.myrole?.some((role) => role.role === roleData.Buyer);

export const hasSellerRole = (currentUser) =>
  currentUser?.myrole?.some((role) => role.role === roleData.Seller);

export const hasPDRole = (currentUser) =>
  currentUser?.myrole?.some(
    (role) => role.role === roleData.Personnel_Delivery
  );

export default withAuth(
  function middleware(req) {
    const currentUser = req?.nextauth?.token;
    const pathname = req?.nextUrl?.pathname;
    // console.log("req", req);
    // console.log("pathname", pathname);
    // console.log("currentUser", currentUser);

    // Client protected route
    if ((pathname === "/login" || pathname === "/register") && currentUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.includes("/dashboard") && !hasAdminRole(currentUser)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      pathname.includes("/seller") &&
      !hasSellerRole(currentUser) &&
      !pathname.includes("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      pathname === "/storefront" &&
      (hasSellerRole(currentUser) ||
        hasAdminRole(currentUser) ||
        hasPDRole(currentUser))
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname === "/delivery" && !hasPDRole(currentUser)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname === "/products/order" && !hasBuyerRole(currentUser)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (pathname === "/chat" && !currentUser) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname === "/checkout" && !hasBuyerRole(currentUser)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Api protected route
    // if (pathname.includes("/api") && !currentUser) {
    //   return new NextResponse("you are not authenticated", {
    //     status: 500,
    //   });
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/seller/:path*",
    "/storefront",
    "/delivery",
    "/products/order",
    "/chat",
    "/checkout",
  ],
};
