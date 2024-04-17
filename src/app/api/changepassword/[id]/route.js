import { NextResponse } from "next/server";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const values = await request.json();
  console.log(values);

  const { current_password, new_password, confirm_password } = values;

  try {
    await connect();

    const user = await User.findById(id);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(current_password, user.password);

    if (passwordMatch) {
      const hashedPassword = await bcrypt.hash(new_password, 5);
      console.log("This");
      // await User.findByIdAndUpdate(id, { password: hashedPassword });

      return new NextResponse("Password updated successfully", { status: 200 });
    } else {
      return new NextResponse("Current password is incorrect", { status: 400 });
    }
  } catch (error) {
    console.error("Database Error:", error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
