import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(): Promise<NextResponse> {
  const cookie = await cookies();
  cookie.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ message: "Logged out successfully" });
}
