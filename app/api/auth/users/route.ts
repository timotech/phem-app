import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch all Roles entries
export async function GET() {
  await connectMongoDB();
  const users = await Users.find();
  return NextResponse.json(users, { status: 200 });
}

// DELETE: Remove an Roles entry by ID
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  await connectMongoDB();
  await Users.findByIdAndDelete(id);
  return NextResponse.json({ message: "Users Info Deleted" }, { status: 200 });
}
