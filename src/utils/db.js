import User from "@/models/User";
import mongoose from "mongoose";
import admin, { roleData } from "./permission";
import Role from "@/models/Role";
import { roleSchema } from "@/validationschema/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);

    let adminRole = await Role.findOne({ role: roleData.Admin });

    if (!adminRole) {
      const validationResult = await roleSchema.safeParse({
        role: roleData.Admin,
      });

      if (!validationResult.success) {
        return new NextResponse("Invalid", { status: 400 });
      }

      const newRole = new Role({
        role: roleData.Admin,
        permission: admin.permissions,
      });

      try {
        adminRole = await newRole.save();
        console.log("Role Created Successfully");
      } catch (error) {
        console.log("create role", error);
        return new NextResponse("Database Error", { status: 500 });
      }
    } else {
      console.log("Admin role already exists");
    }

    const user = await User.findOne({
      email: admin.email,
    });

    if (!user) {
      if (!adminRole) {
        console.error("Admin role is not defined");
        return new NextResponse("Admin Role Not Found", { status: 500 });
      }

      const { permission, ...others } = admin;
      const hashedPassword = await bcrypt.hash(others?.password, 5);
      others.role = adminRole._id;
      others.password = hashedPassword;

      try {
        await User.create(others);
        console.log("Admin has been created");
      } catch (error) {
        console.log("create admin", error);
        return new NextResponse("Database Error", { status: 500 });
      }
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.log("connect to mongodb failed", error);
  }
};

export default connect;
