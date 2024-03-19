import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="p-4 border-b h-full flex bg-white dark:bg-background items-center shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
}
