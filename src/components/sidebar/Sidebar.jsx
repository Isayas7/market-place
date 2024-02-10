import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdPersonalInjury,
} from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import SidebarLink from "./SidebarLink";
import { FiAlignJustify } from "react-icons/fi";

const menuUtems = [
  {
    List: [
      {
        titile: "Dashboard",
        path: "/dashboard",
        icon: <MdOutlineDashboard />,
      },
      {
        titile: "Products",
        path: "/dashboard/products",
        icon: <MdProductionQuantityLimits />,
      },
      {
        titile: "Users",
        path: "/dashboard/users",
        icon: <MdPersonalInjury />,
      },
      {
        titile: "Orders",
        path: "/dashboard/orders",
        icon: <TbReorder />,
      },
      {
        titile: "Analytics",
        path: "/dashboard/analytics",
        icon: <IoAnalytics />,
      },
    ],
  },
];
const Sidebar = () => {
  return (
    <>
      <ul>
        {menuUtems.map((menu) => (
          <li key={menu.titile}>
            <div className="flex align-middle pl-3 py-5">
              <FiAlignJustify />
            </div>
            {menu.List.map((list) => (
              <SidebarLink list={list} key={list.titile} />
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
