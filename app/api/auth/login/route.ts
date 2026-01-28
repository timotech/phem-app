export const runtime = "nodejs";

import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface UserDocument {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface RequestBody {
  identifier: string;
  password: string;
}

interface TokenPayload {
  id: string;
  email: string;
  username: string;
  name: string;
}

export async function POST(req: Request) {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET not set");
    }

    const { identifier, password }: RequestBody = await req.json(); // identifier = email or username
    const cookie = await cookies();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    await connectMongoDB();

    const user: UserDocument | null = await Users.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
      } as TokenPayload,
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Set cookie
    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ message: "Login successful." }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 },
    );
  }
}
