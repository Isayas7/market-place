import { NextResponse } from "next/server";

export async function middleware(request) {
  return new NextResponse("unauthorized user", {
    status: 404,
  });
}
