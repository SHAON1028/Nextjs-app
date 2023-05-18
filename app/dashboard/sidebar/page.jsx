import Link from "next/link";
import React from "react";
import { RiMenu3Line } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
const SidebarPage = () => {
  return (
    <div className="mw-100 bg-primary text-white w-25 text-center mt-2">
      <p className="p-2 border-bottom ">Dashboard</p>
      <ul className="list-unstyled text-decoration-none">
      <li>
          <Link
            href="/dashboard/sidebar/brand"
            className="text-decoration-none text-white"
          >
            <span className="pe-2 text-secondary">
              <TbBrandBooking />
            </span>
            Brand
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/sidebar/menu"
            className="text-decoration-none text-white"
          >
            <span className="pe-2 text-secondary">
              <RiMenu3Line />
            </span>
            Menu
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarPage;
