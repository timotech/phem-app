import connectMongoDB from "@/app/lib/mongodb";
import Users from "@/models/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// interface UserDocument {
//   _id: string;
//   email: string;
//   username: string;
//   firstName: string;
//   lastName: string;
//   password: string;
// }

interface RequestBody {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  message: string;
}

export async function POST(
  req: Request,
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    const { username, email, password, firstName, lastName }: RequestBody =
      await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required." },
        { status: 400 },
      );
    }

    await connectMongoDB();

    const userExists = await Users.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }, // 409 Conflict is more appropriate for duplicate resources
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      ...(firstName && { firstName }), // Only include if provided
      ...(lastName && { lastName }), // Only include if provided
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 },
    );
  }
}
