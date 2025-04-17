
import React from "react";
import { Outlet } from "react-router-dom";
import MobileFrame from "./MobileFrame";
import BottomNavigation from "./BottomNavigation";

const MobileAppLayout = () => {
  return (
    <MobileFrame>
      <div className="flex flex-col min-h-full">
        <div className="flex-1">
          <Outlet />
        </div>
        <BottomNavigation />
      </div>
    </MobileFrame>
  );
};

export default MobileAppLayout;
