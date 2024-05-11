import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ProductCategory from "@/models/ProductCategory";
import mongoose from "mongoose";
import { statusData } from "@/utils/permission";

export const GET = async (request, { params }) => {
  try {
    const variantData = await ProductCategory.aggregate([
      { $unwind: "$variants" },

      { $match: { "variants._id": new mongoose.Types.ObjectId(params.id) } },

      {
        $project: {
          categoryName: 1,
          variant: "$variants",
        },
      },
    ]);

    const brandsWithVariantId = variantData.map((item) => ({
      categoryName: item.categoryName,
      variantName: item.variant.name,
      variantId: item.variant._id,
      brands: item.variant.brands.map((brand) => ({
        ...brand,
      })),
    }));

    return new NextResponse(JSON.stringify(brandsWithVariantId[0]), {
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Database Error", error, { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const values = await request.json();
  const { variants, brands } = values;

  try {
    const productCategory = await ProductCategory.findOne({
      categoryName: params.id,
    });

    const product = productCategory.variants.find(
      (prod) => prod.name === variants
    );

    const updatedBrands = [...product.brands, ...brands];

    product.brands = updatedBrands;

    await productCategory.save();

    return new NextResponse("Brand of product Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const values = await request.json();

  await connect();

  try {
    const result = await ProductCategory.findOneAndUpdate(
      { "variants._id": params.id },

      { $set: { "variants.$.brands": values.brands } },
      {
        new: true,
      }
    );

    return new NextResponse(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();

    const productCategory = await ProductCategory.findOne({
      "variants._id": id,
    });
    if (!productCategory) {
      return new NextResponse("ProductCategory not found", { status: 404 });
    }

    const variantIndex = productCategory.variants.findIndex((variant) =>
      variant._id.equals(id)
    );
    if (variantIndex === -1) {
      return new NextResponse("Variant not found", { status: 404 });
    }

    const currentStatus = productCategory.variants[variantIndex].status;

    const newStatus =
      currentStatus === statusData.Active
        ? statusData.Banned
        : statusData.Active;

    productCategory.variants[variantIndex].status = newStatus;

    await productCategory.save();

    return new NextResponse(JSON.stringify(productCategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
