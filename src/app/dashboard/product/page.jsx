"use client";

import { DataTable } from "@/components/dashboard/table/data_table";
import {
  UseCategoryQuery,
  UseSingleCategoryQuery,
} from "@/hooks/use-product-category-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { product_columns } from "@/components/dashboard/table/column/product-column";

const Products = () => {
  const { data: product_category, isLoading } = UseCategoryQuery();
  const [selectedOption, setSelectedOption] = useState("");
  const [productNames, setProductNames] = useState([]);

  if (product_category) {
    const handleCategoryChange = (value) => {
      const selectedCategory = product_category.data.find(
        (category) => category.categoryName === value
      );
      if (selectedCategory) {
        setProductNames(selectedCategory.productNames);
      }
    };

    return (
      <div>
        <Select
          onValueChange={(value) => {
            setSelectedOption(value);
            handleCategoryChange(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an operation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {product_category.data.map((category) => (
                <SelectItem key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <DataTable
          columns={product_columns}
          data={productNames}
          myparams={"name"}
        />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-1/2">
        <AiOutlineLoading3Quarters className="text-5xl text-jade animate-spin" />
      </div>
    );
  }
};

export default Products;
