"use client";
import { AuthContext } from "@/app/context/UserContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
const Brand = () => {
  const { user, setupLogo } = useContext(AuthContext);
  const [logo, setLogo] = useState();
  const getLogo = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("working");
    // const image = data.image[0];
    const brandName = e.target.brand.value;
    const formData = new FormData();
    const imagedata = e.target.image.files[0];
    console.log(imagedata);
    formData.append("image", imagedata);
    console.log(formData);
    const url =
      "https://api.imgbb.com/1/upload?key=5a2bc614923a1c00357db44f6264027d";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const menuInfo = {
            user: user.email,
            name: brandName,
            logo: imgData.data.url,
          };
          console.log(menuInfo);

          fetch("https://next-backend-17akbmwng-shaon1028.vercel.app/brand", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(menuInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success("updated menu");
              setupLogo(true);
              console.log("setUpLogo False");
            });
        }
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <h4 className="pe-2">Brand Name : </h4>
          <input name="brand" type="text" required />
        </div>
        <div className="d-flex mt-5">
          <h4 className="pe-2">Logo : </h4>
          <input
            type="file"
            name="image"
            placeholder="Job Skills"
            className="InputData w-1/4 h-full ml-0 pl-0"
            required
            onChange={getLogo}
          />
          <Image src={logo} width={300} height={200} alt="Brand Logo" />
        </div>

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
};

export default Brand;
