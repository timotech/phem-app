import connectMongoDB from "@/app/lib/mongodb";
//import getModel from "@/utils/getModel";
import Roles from "@/models/roles";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/app/lib/logger";

//const Roles = getModel("Roles");

// Define interface for the Roles item
interface RolesItem {
  rolename: string;
  description?: string;
}

// POST: Create new Roles entry
export async function POST(request: NextRequest) {
  logger.log("In roles section");
  const { rolename, description }: RolesItem = await request.json();
  await connectMongoDB();
  await Roles.create({ rolename, description });
  return NextResponse.json({ message: "Roles Info Created" }, { status: 201 });
}

// GET: Fetch all Roles entries
export async function GET() {
  await connectMongoDB();
  const roles = await Roles.find();
  return NextResponse.json(roles, { status: 200 });
}

// DELETE: Remove an Roles entry by ID
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }
  await connectMongoDB();
  await Roles.findByIdAndDelete(id);
  return NextResponse.json({ message: "Roles Info Deleted" }, { status: 200 });
}
