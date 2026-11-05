import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse("Not found", {
      status: 404,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  return NextResponse.next();
}
export const config = { matcher: "/preview/:path*" };
