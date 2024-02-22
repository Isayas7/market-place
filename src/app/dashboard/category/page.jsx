import { DataTable } from "@/components/dashboard/table/data_table";
import { category_columns } from "@/components/dashboard/table/category-column";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      categoryName: "Electronics",
      numberOfProducts: 6,
      status: "active",
      creator: "Isayas Nelkamu",
    },
    {
      id: "728ed52e",
      categoryName: "Vehicles",
      numberOfProducts: 3,
      status: "deactivated",
      creator: "Isayas Nelkamu",
    },
    {
      id: "728ed52q",
      categoryName: "Wearables",
      numberOfProducts: 4,
      status: "active",
      creator: "Elsabet Awraris",
    },
    {
      id: "728ed52s",
      categoryName: "Clothing",
      numberOfProducts: 8,
      status: "active",
      creator: "Elsabet Awraris",
    },
    {
      id: "728ed52c",
      categoryName: "Furniture",
      numberOfProducts: 5,
      status: "active",
      creator: "Isayas Melkamu",
    },
  ];
}
const Category = async () => {
  const data = await getData();
  return (
    <div>
      <DataTable columns={category_columns} rendered="category" data={data} />
    </div>
  );
};

export default Category;
