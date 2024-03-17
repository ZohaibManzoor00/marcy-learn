import SidebarRoutes from "./sidebar-routes";
import Logo from "./logo";

export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div></div>
      <div className="p-6 flex items-center gap-1 font-semibold">
        <Logo />
        Marcy
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
