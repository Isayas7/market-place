import User from "@/models/User";
import {
  deliveryPersonnelSchema,
  registerSchema,
  storefrontSchema,
} from "@/validationschema/user";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { roleData } from "@/utils/permission";
import Role from "@/models/Role";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  let query = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  const pageSize = 10;
  const currentPage = parseInt(query.page);

  try {
    await connect();
    const userRole = await Role.findOne({ role: query.role });

    if (!!userRole === false) {
      return new NextResponse(JSON.stringify([]), {
        status: 200,
      });
    }
    delete query.role;
    if (query.page) {
      delete query.page;
      const count = await User.find({
        role: { $in: [userRole._id] },
        ...query,
      }).countDocuments();

      const users = await User.find({
        role: { $in: [userRole._id] },
        ...query,
      })
        .limit(pageSize)
        .skip((currentPage - 1) * pageSize);

      const totalPage = Math.ceil(count / pageSize);

      return new NextResponse(
        JSON.stringify({ users, totalPage, currentPage }),
        {
          status: 200,
        }
      );
    } else {
      const users = await User.find({
        role: { $in: [userRole._id] },
        ...query,
      });
      return new NextResponse(JSON.stringify(users), {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const values = await request.json();

  const validationResult =
    values.role === roleData.Personnel_Delivery
      ? deliveryPersonnelSchema.safeParse(values)
      : values.role === roleData.Buyer
      ? registerSchema.safeParse(values)
      : storefrontSchema.safeParse(values);

  if (!validationResult.success) {
    return new NextResponse("Invalid", { status: 400 });
  }

  const { password, role, ...other } = values;

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);
  const myrole = await Role.findOne({ role: role });

  if (!!myrole === true) {
    const newUser = new User({
      password: hashedPassword,
      role: myrole._id,
      ...other,
    });

    try {
      await newUser.save();
      return new NextResponse("User has been created", { status: 201 });
    } catch (error) {
      console.log("error", error);
      return new NextResponse("something went wrong!", { status: 500 });
    }
  } else return new NextResponse("role does not exist!", { status: 500 });
};
