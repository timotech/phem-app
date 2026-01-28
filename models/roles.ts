import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoles extends Document {
  rolename: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const roleSchema = new Schema<IRoles>(
  {
    rolename: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Roles: Model<IRoles> =
  mongoose.models.Roles || mongoose.model("Roles", roleSchema);
export default Roles;
