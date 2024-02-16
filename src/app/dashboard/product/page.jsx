import { columns } from "@/components/dashboard/table/column";
import { DataTable } from "@/components/dashboard/table/data_table";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "backlog",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "backlog",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "todo",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "in progress",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "in progress",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "canceled",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "canceled",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "backlog",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "canceled",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "todo",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "backlog",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "backlog",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "todo",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "in progress",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "in progress",
    },
    {
      id: "728ed52f",
      email: "nonummy.ut@protonmail.ca",
      amount: 6,
      status: "canceled",
    },
    {
      id: "728ed52e",
      email: "consectetuer.rhoncus@outlook.edu",
      amount: 3,
      status: "canceled",
    },
    {
      id: "728ed52q",
      email: "dolor.fusce@aol.org",
      amount: 4,
      status: "backlog",
    },
    {
      id: "728ed52s",
      email: "mauris@aol.ca",
      amount: 8,
      status: "canceled",
    },
    {
      id: "728ed52c",
      email: "nullam@yahoo.couk",
      amount: 5,
      status: "todo",
    },
  ];
}
const Products = async () => {
  const data = await getData();
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Products;
