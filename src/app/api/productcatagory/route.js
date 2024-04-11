import ProductCategory from "@/models/ProductCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { uploadImage } from "@/utils/cloudinary";
import User from "@/models/User";

export const GET = async (request) => {
  try {
    await connect();
    const productCategories = await ProductCategory.find();

    const modifiedCategories = productCategories.map((category) => {
      const products = category.productNames.map((product) => product.name);
      return { ...category.toObject(), products: products };
    });
    return new NextResponse(JSON.stringify(modifiedCategories), {
      status: 200,
    });
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

  const { categoryName, email, selectedImage } = values;
  let product = [];

  Object.keys(values).forEach(async (key) => {
    if (key.startsWith("image_")) {
      const index = key.split("_")[1];
      const productNameKey = `productName_${index}`;
      if (values[productNameKey]) {
        const productName = values[productNameKey];
        const imageFile = values[key];

        const myImage = await uploadImage(imageFile, "marketplace-product");

        product.push({
          name: productName,
          image: {
            public_id: myImage.public_id,
            url: myImage.secure_url,
          },
        });
      }
    }
  });

  const categoryImage = await uploadImage(
    selectedImage,
    "marketplace-category"
  );
  const creator = await User.findOne({ email: email });

  try {
    // Save product category with products array
    const newProductCategory = new ProductCategory({
      categoryName,
      productNames: product,
      user: creator._id,
      image: {
        public_id: categoryImage.public_id,
        url: categoryImage.secure_url,
      },
    });

    await newProductCategory.save();

    return new NextResponse("Product category Created Successfully", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Database Error", { status: 500 });
  }
};
