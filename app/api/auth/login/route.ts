export const runtime = "nodejs";

import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
//import Roles from "@/models/roles"; // Import the Roles model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Types } from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Define the populated role structure
interface PopulatedRole {
  _id: Types.ObjectId;
  rolename: string;
  description?: string;
}

// interface UserDocument {
//   _id: Types.ObjectId;
//   email: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   password: string;
//   roleId: PopulatedRole | Types.ObjectId; // Can be either populated object or just ObjectId
// }

interface RequestBody {
  identifier: string;
  password: string;
}

interface TokenPayload {
  id: string;
  email: string;
  username: string;
  name: string;
  role: string; // Store role name as string, not ObjectId
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

    const user = await Users.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).populate<{ roleId: PopulatedRole }>("roleId", "rolename");

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

    // Get the role name - check if it's populated or not
    let roleName = "";
    if (typeof user.roleId === "object" && "rolename" in user.roleId) {
      // roleId is populated
      roleName = (user.roleId as PopulatedRole).rolename;
    } else {
      roleName = "Student"; // Default role name or fetch from Roles collection if needed
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
        role: roleName,
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

    return NextResponse.json(
      {
        message: "Login successful.",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roleId,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login." },
      { status: 500 },
    );
  }
}
