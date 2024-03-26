import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ProductCategory from "@/models/ProductCategory";
import { uploadImage } from "@/utils/cloudinary";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    const productcategory = await ProductCategory.findById(id);
    return new NextResponse(JSON.stringify(productcategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request, { params }) => {
  const formData = await request.formData();

  // Extract form values
  const values = {};
  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }

  const { productId, categoryId } = values;

  let brand = [];

  // Iterate over form data keys with for...of loop
  for (const key of Object.keys(values)) {
    if (key.startsWith("image_")) {
      const index = key.split("_")[1];
      const brandNameKey = `brandName_${index}`;
      if (values[brandNameKey]) {
        const brandName = values[brandNameKey];
        const imageFile = values[key];

        // Wait for the uploadImage function call to complete
        const myImage = await uploadImage(imageFile, "marketplace-brand");
        // console.log(brandName, myImage);
        brand.push({
          name: brandName,
          image: {
            public_id: myImage.public_id,
            url: myImage.secure_url,
          },
        });
      }
    }
  }

  try {
    const productCategory = await ProductCategory.findById(categoryId);

    const product = productCategory.productNames.find(
      (prod) => prod._id.toString() === productId
    );

    product.brands = brand;

    // console.log(product);

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
  const { id } = params;
  const values = request.json();

  const { ...other } = values;

  try {
    await connect();

    const updatedProductCategory = await ProductCategory.findOneAndUpdate(
      { _id: id },
      { $set: other },
      { new: true }
    );

    if (!updatedProductCategory) {
      return new NextResponse("ProductCategory not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedProductCategory), {
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

    const productcategory = await ProductCategory.findById(id);
    if (!productcategory) {
      return new NextResponse("ProductCategory not found", { status: 404 });
    }
    productcategory.isActive = false;
    await productcategory.save();

    return new NextResponse(JSON.stringify(productcategory), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
