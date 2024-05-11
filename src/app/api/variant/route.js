import ProductCategory from "@/models/ProductCategory";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  let query = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const pageSize = 6;
  const currentPage = parseInt(query.page);

  const categoryQuery = {};
  for (const key in query) {
    if (key === "categoryName") {
      categoryQuery[key] = query[key];
    }
  }
  const variantQuery = {};
  for (const key in query) {
    if (key !== "categoryName" && key !== "page") {
      variantQuery[`variants.${key}`] = query[key];
    }
  }

  try {
    await connect();
    if (query.page) {
      delete query.page;

      const countResult = await ProductCategory.aggregate([
        { $match: categoryQuery },

        { $unwind: "$variants" },

        { $match: variantQuery },

        { $count: "totalCount" },
      ]);

      const totalCount = countResult.length > 0 ? countResult[0].totalCount : 0;

      const productCategories = await ProductCategory.aggregate([
        { $match: categoryQuery },

        { $unwind: "$variants" },
        {
          $match: variantQuery,
        },

        { $skip: (currentPage - 1) * pageSize },
        { $limit: pageSize },
      ]);

      const totalPage = Math.ceil(totalCount / pageSize);

      return new NextResponse(
        JSON.stringify({ productCategories, totalPage, currentPage }),
        {
          status: 200,
        }
      );
    } else {
      const productCategories = await ProductCategory.find(query);

      return new NextResponse(JSON.stringify(productCategories), {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
