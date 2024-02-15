import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdPersonalInjury,
} from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import SidebarLink from "./SidebarLink";
import { FaStore } from "react-icons/fa6";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";

export const menuUtems = [
  {
    List: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdOutlineDashboard />,
      },

      {
        title: "User",
        path: "/dashboard/user",
        icon: <MdPersonalInjury />,
      },
      {
        title: "Product Category",
        path: "/dashboard/productCategory",
        icon: <FaStore />,
      },
      {
        title: "Store",
        path: "/dashboard/store",
        icon: <FaStore />,
      },
      {
        title: "Product",
        path: "/dashboard/product",
        icon: <MdProductionQuantityLimits />,
      },
      {
        title: "Order",
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
      <ul className="hidden md:block pl-5 ">
        <div className={`ml-3 py-4`}>
          <Image
            src={"/icon.png"}
            width={100}
            height={100}
            className="size-12"
          />
        </div>
        {menuUtems.map((menu) => (
          <li key={menu.title}>
            {menu.List.map((list) => (
              <SidebarLink
                isCollapsed={isCollapsed}
                list={list}
                key={list.title}
              />
            ))}
          </li>
        ))}
      </ul>

      <div className="xl:hidden">
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
          <DrawerContent className="border-none overflow-y-scroll">
            <ul>
              <div className={`ml-3 py-4`}>
                <Image
                  src={"/icon.png"}
                  width={100}
                  height={100}
                  className="size-12"
                />
              </div>
              {menuUtems.map((menu, index) => (
                <li key={index}>
                  {menu.List.map((list) => (
                    <SidebarLink
                      isCollapsed={isCollapsed}
                      list={list}
                      key={list.title}
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
