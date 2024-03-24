import SidebarRoutes from "./sidebar-routes";
import Logo from "./logo";

export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div></div>
      <div className="p-6 flex items-center gap-1">
        <Logo />
        <h1 className="font-semibold text-lg">Marcy Learn</h1>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}
