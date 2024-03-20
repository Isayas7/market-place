import Role from "@/models/Role";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connect();
    const role = await Role.find();
    return new NextResponse(JSON.stringify(role), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const values = await request.json();
  const { name } = values;
  await connect();
  const newRole = new Role({ name });

  try {
    // console.log(newRole);
    await newRole.save();
    return new NextResponse("Role Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
// export const PUT = async (request) => {
//   const values = await request.json();
//   const { name, permission } = values;
//   await connect();
//   try {
//     const existingRole = await Role.findOne({ name });

//     if (!existingRole) {
//       return new NextResponse("Role does not exist", { status: 400 });
//     } else {
//       const index = existingRole.permission.indexOf(permission);
//       if (index !== -1) {
//         existingRole.permission.splice(index, 1);
//       } else {
//         existingRole.permission.push(permission);
//       }
//       await existingRole.save();
//       return new NextResponse("Role Updated Successfully", { status: 200 });
//     }
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Database Error", { status: 500 });
//   }
// };

export const PUT = async (request) => {
  const data = await request.json();
  try {
    for (const roleName in data) {
      if (Object.hasOwnProperty.call(data, roleName)) {
        const permissions = data[roleName];
        let role = await Role.findOne({ name: roleName });

        if (!role) {
          return new NextResponse("Roles does not found", { status: 400 });
        } else {
          // Role found, update permissions
          permissions.forEach((permission) => {
            if (role.permission.includes(permission)) {
              role.permission = role.permission.filter((p) => p !== permission);
            } else {
              role.permission.push(permission);
            }
          });
        }
        await role.save();
      }
    }
    return new NextResponse("Roles updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
