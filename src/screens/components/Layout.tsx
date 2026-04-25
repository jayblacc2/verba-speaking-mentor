import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import Logo from "../../components/Logo";

export function MobileLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Explore", icon: "explore", path: "/explore" },
    { name: "Speak", icon: "mic", path: "/conversation" },
    { name: "Stats", icon: "query_stats", path: "/progress" },
    { name: "Profile", icon: "person", path: "/profile" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface">
      {/* Side Nav for Tablet/Desktop */}
      <nav className="hidden md:flex flex-col w-64 lg:w-72 border-r border-outline-variant/20 bg-surface-container-lowest p-6 sticky top-0 h-screen">
        <div className="mb-10 pl-4">
          <Logo />
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-on-primary font-bold shadow-md" 
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <span 
                  className={cn("material-symbols-outlined text-[24px]", isActive && "fill-current")}
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="font-label text-base lg:text-lg">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 pb-24 md:pb-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav Bar (Mobile Only) */}
      <nav className="md:hidden bg-surface-container-low/80 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-12px_24px_-4px_rgba(53,47,69,0.05)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-safe pt-2 pb-5 rounded-t-3xl">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95",
                isActive ? "bg-primary text-on-primary rounded-full shadow-[0_4px_12px_rgba(44,100,133,0.3)] transform -translate-y-[2px]" : "text-on-surface-variant hover:text-primary opacity-60 hover:opacity-100"
              )}
            >
              <span 
                className={cn("material-symbols-outlined mb-0.5 text-[18px] sm:text-[20px] transition-all duration-500", isActive && "fill-current")}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className={cn("font-label text-[10px] font-semibold transition-all duration-500", isActive ? "opacity-100" : "opacity-90")}>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
