import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div></div>
      <div className="p-6 flex items-center gap-1">
        <Logo />
        <p>Marcy</p>

      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes/> </div>
    </div>
  );
}
