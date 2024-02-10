import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-custom grid-rows-custom h-screen">
      <header className="  py-3 px-12 rounded-sm border-b border-gray-100">
        <Navbar />
      </header>

      <aside className=" row-custom px-6  border-r border-gray-100  overflow-y-scroll ">
        <Sidebar />
      </aside>
      <main className="  pt-10  px-12 overflow-y-scroll">{children}</main>
    </div>
  );
};

export default Layout;
