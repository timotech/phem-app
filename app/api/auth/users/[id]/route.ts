import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// Define interface for the Roles item
interface UsersItem {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId?: mongoose.Types.ObjectId;
}

// PUT: Update an Brand entry by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { username, email, password, firstName, lastName, roleId }: UsersItem =
    await request.json();
  await connectMongoDB();
  await Users.findByIdAndUpdate(id, {
    username,
    email,
    password,
    firstName,
    lastName,
    roleId,
  });
  return NextResponse.json({ message: "Users Info Updated" }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await connectMongoDB();
  const brand = await Users.findOne({ _id: id });
  return NextResponse.json(brand, { status: 200 });
}
