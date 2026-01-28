import connectMongoDB from "@/app/lib/mongodb";
import Roles from "@/models/roles";
import { NextResponse, NextRequest } from "next/server";

// Define interface for the Roles item
interface RolesItem {
  rolename: string;
  description?: string;
}

// PUT: Update an Brand entry by ID
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const { rolename, description }: RolesItem = await request.json();
  await connectMongoDB();
  await Roles.findByIdAndUpdate(id, { rolename, description });
  return NextResponse.json({ message: "Roles Info Updated" }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  await connectMongoDB();
  const brand = await Roles.findOne({ _id: id });
  return NextResponse.json(brand, { status: 200 });
}
