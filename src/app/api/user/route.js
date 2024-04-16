import User from "@/models/User";
import { deliveryPersonnelSchema } from "@/validationschema/user";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { uploadImage } from "@/utils/cloudinary";
import Role from "@/models/Role";

export const GET = async (request) => {
  try {
    await connect();
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const formData = await request.formData();

  // Extract form values
  const values = {};
  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }

  const { selectedIdCard, selectedId, ...other } = values;

  const idCard = await uploadImage(selectedIdCard, "marketplace-cridential");
  const nationlId = await uploadImage(selectedId, "marketplace-cridential");

  await connect();

  // Hash password
  const password = "ABCabc123@#";
  const hashedPassword = await bcrypt.hash(password, 5);
  const role = "Delivery Personnel";

  const myrole = await Role.find({ name: role });

  try {
    const newUser = new User({
      ...other,
      password: hashedPassword,
      identificationCard: {
        public_id: idCard.public_id,
        url: idCard.secure_url,
      },
      nationalId: {
        public_id: nationlId.public_id,
        url: nationlId.secure_url,
      },
      role: myrole[0]._id,
    });

    await newUser.save();

    return new Response("User has been created", { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
