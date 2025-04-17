
import React from "react";
import { cn } from "@/lib/utils";

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
}

const MobileFrame = ({ children, className }: MobileFrameProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-piggy-background p-4">
      <div 
        className={cn(
          "relative w-full max-w-[390px] h-[844px] overflow-hidden rounded-[2.5rem] border-8 border-piggy-card/80 bg-piggy-background shadow-xl",
          className
        )}
      >
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-6 px-6 flex items-center justify-between z-10 bg-piggy-background/80 backdrop-blur-md">
          <span className="text-xs text-piggy-text font-medium">9:41</span>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-piggy-text">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10a6 6 0 0 0-6-6M18 14a10 10 0 0 0-10-10" />
                <path d="M18 6a2 2 0 0 0-2-2" />
              </svg>
            </span>
            <span className="text-xs text-piggy-text">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18h8" />
                <path d="M10 22v-4" />
                <path d="M15 7h1" />
                <path d="M18 7h1" />
                <path d="M14 3h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
              </svg>
            </span>
          </div>
        </div>
        {/* Main content */}
        <div className="h-full pt-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default MobileFrame;
