import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface JwtPayload {
  id: string;
  email: string;
  username: string;
  name: string;
  iat?: number;
  exp?: number;
}

export async function GET(): Promise<
  NextResponse<{ user: JwtPayload | null }>
> {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    return NextResponse.json({ user });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { user: null, error: "Invalid token." },
        { status: 401 },
      );
    }
    if (err instanceof jwt.NotBeforeError) {
      return NextResponse.json(
        { user: null, error: "Token not active." },
        { status: 401 },
      );
    }
    if (err instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { user: null, error: "Token expired." },
        { status: 401 },
      );
    }
    // Handle other potential errors here
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
