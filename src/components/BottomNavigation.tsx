
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ScanLine, Clock, PiggyBank, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/"
    },
    {
      name: "Scan",
      icon: ScanLine,
      path: "/scan"
    },
    {
      name: "Transactions",
      icon: Clock,
      path: "/transactions"
    },
    {
      name: "Savings",
      icon: PiggyBank,
      path: "/savings"
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-piggy-card/80 backdrop-blur-md flex justify-around py-3 rounded-t-xl border-t border-white/5 z-20">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.name} to={item.path} className="flex flex-col items-center justify-center">
            <div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                isActive 
                  ? "bg-piggy-primary neon-glow text-piggy-background" 
                  : "text-piggy-textMuted hover:text-piggy-text"
              )}
            >
              <item.icon size={20} />
            </div>
            <span className={cn(
              "text-xs mt-1",
              isActive ? "text-piggy-text" : "text-piggy-textMuted"
            )}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
