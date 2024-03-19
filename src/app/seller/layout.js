import NavLink from "@/components/seller/NavLink";
import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdPersonalInjury,
} from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { FaStore } from "react-icons/fa6";

export const menuUtems = [
  {
    title: "Dashboard",
    path: "/seller",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "Product",
    path: "/seller/product",
    icon: <MdProductionQuantityLimits />,
  },
  {
    title: "Order",
    path: "/seller/order",
    icon: <TbReorder />,
  },
  {
    title: "Payment",
    path: "/seller/payment",
    icon: <TbReorder />,
  },
];

const SellerLayout = ({ children }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-10 ">
      <div className="container bg-card text-card-foreground xl:sticky top-20 self-start py-4 rounded-lg w-full xl:w-1/4 ">
        <ul className="  flex  flex-wrap xl:flex-col">
          {menuUtems.map((list) => (
            <li key={list.title}>
              <NavLink list={list} key={list.title} />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full xl:w-3/4">{children}</div>
    </div>
  );
};

export default SellerLayout;
