import React from "react";
import SidebarPage from "./sidebar/page";

const DashboardLayout = ({ children }) => {
  return (
    <div className="container d-flex ">
      <SidebarPage />
     <main className="mt-2 ps-5">
        {children}
     </main>
    </div>
  );
};

export default DashboardLayout;
