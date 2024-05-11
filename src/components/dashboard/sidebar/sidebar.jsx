import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdPersonalInjury,
} from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import SidebarLink from "./sidebar-link";
import { FaStore } from "react-icons/fa6";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import Link from "next/link";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { SiHomeassistantcommunitystore } from "react-icons/si";

export const menuUtems = [
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
    title: "Category",
    path: "/dashboard/category",
    icon: <FaStore />,
  },
  {
    title: "Variant",
    path: "/dashboard/variant",
    icon: <MdProductionQuantityLimits />,
  },
  {
    title: "product",
    path: "/dashboard/product",
    icon: <MdProductionQuantityLimits />,
  },
  {
    title: "Order",
    path: "/dashboard/order",
    icon: <TbReorder />,
  },
  {
    title: "Role",
    path: "/dashboard/role",
    icon: <BsFillPersonLinesFill />,
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
          <Link href="/">
            <Image
              src={"/icon.png"}
              width={100}
              height={100}
              className="size-12"
            />
          </Link>
        </div>

        {menuUtems.map((list) => (
          <li key={list.title}>
            <SidebarLink
              isCollapsed={isCollapsed}
              list={list}
              key={list.title}
            />
          </li>
        ))}
      </ul>

      <div className="xl:hidden">
        <Drawer
          direction="left"
          open={open}
          onOpenChange={setOpen}
          className="left-0"
        >
          <DrawerOverlay className="fixed inset-0 z-50  bg-black/80" />
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
              {menuUtems.map((list) => (
                <li key={list.title}>
                  <SidebarLink
                    isCollapsed={isCollapsed}
                    list={list}
                    key={list.title}
                  />
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
