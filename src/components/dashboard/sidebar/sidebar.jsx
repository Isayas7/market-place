import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdPersonalInjury,
} from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import SidebarLink from "./SidebarLink";
import { FiAlignJustify } from "react-icons/fi";
import { FaStore } from "react-icons/fa6";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const menuUtems = [
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
        titile: "Store",
        path: "/dashboard/store",
        icon: <FaStore />,
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
    ],
  },
];
const Sidebar = ({ isCollapsed, open, setOpen }) => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (isDesktop) {
    setOpen(false);
  }

  return (
    <>
      <ul className="hidden md:block">
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
      <div className="xl:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerContent className="border-none overflow-y-scroll">
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
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default Sidebar;
