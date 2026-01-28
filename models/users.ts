import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUsers extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleId?: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUsers>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    roleId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Users: Model<IUsers> =
  mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
