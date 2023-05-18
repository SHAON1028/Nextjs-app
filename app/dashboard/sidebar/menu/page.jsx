"use client";
import { AuthContext } from "@/app/context/UserContext";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const MenuList = () => {
  const { user, setupLogo, menu } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("working");
    // const image = data.image[0];
    const menuname = e.target.name.value;
    const menuInfo = {
      user: user.email,
      menuname: menuname,
    };
    fetch("https://next-backend-17akbmwng-shaon1028.vercel.app/menu", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menuInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("menu updated");
        setupLogo(true);
        e.target.reset();
      });
  };
  console.log("menu", menu);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <h4 className="pe-2">Name : </h4>
          <input name="name" type="text" required />
          <button type="submit" className="btn btn-success ms-2">
            Add
          </button>
        </div>
      </form>
      {/* list of menu */}
      <h5 className="text-center mt-5">Menu List:</h5>
      <ul>
        {menu?.menuname.map((item) => (
          <li key={item.id}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
