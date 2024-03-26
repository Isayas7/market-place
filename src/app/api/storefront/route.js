import Role from "@/models/Role";
import StoreFront from "@/models/Storefront";
import User from "@/models/User";
import { uploadImage } from "@/utils/cloudinary";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const storefronts = await StoreFront.find();

    return new NextResponse(JSON.stringify(storefronts), { status: 200 });
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

  const { selectedIdCard, selectedId, location, email, ...other } = values;

  const idCard = await uploadImage(selectedIdCard, "marketplace-cridential");
  const nationlId = await uploadImage(selectedId, "marketplace-cridential");

  await connect();

  const myrole = await Role.find({ name: "Seller" });

  const newInformation = {
    ...other,
    identificationCard: {
      public_id: idCard.public_id,
      url: idCard.secure_url,
    },
    nationalId: {
      public_id: nationlId.public_id,
      url: nationlId.secure_url,
    },
    role: myrole[0]._id,
  };

  // Find the user
  const user = await User.findOneAndUpdate(
    { email: email },
    { $set: newInformation },
    { new: true }
  );

  // Check if the user exists before accessing its _id
  if (!user) {
    console.log("User not found with email:", email);
    return new NextResponse("User not found", { status: 404 });
  }

  console.log(user);

  const newStorefront = new StoreFront({ location, user: user._id });

  try {
    await newStorefront.save();
    return new NextResponse("Storefront Created Successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
