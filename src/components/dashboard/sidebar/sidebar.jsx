import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdPersonalInjury,
} from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import SidebarLink from "./sidebar-link";
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
        titile: "User",
        path: "/dashboard/user",
        icon: <MdPersonalInjury />,
      },
      {
        titile: "Product",
        path: "/dashboard/product",
        icon: <MdProductionQuantityLimits />,
      },
      {
        titile: "Order",
        path: "/dashboard/order",
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
const Sidebar = ({ isCollapsed }) => {
  return (
    <>
      <ul>
        {menuUtems.map((menu) => (
          <li key={menu.titile}>
            <div className="flex items-center pl-3 py-5"></div>
            {menu.List.map((list) => (
              <SidebarLink
                isCollapsed={isCollapsed}
                list={list}
                key={list.titile}
              />
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
