"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
export const Header = () => {
  const { user, logOut, loading, setupLogo, uplogo, menu, setMenu } =
    useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => console.log(error));
  };

  console.log(data);
  useEffect(() => {
    setisLoading(true);
    fetch(
      `https://next-backend-17akbmwng-shaon1028.vercel.app/brand?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setisLoading(false);
        console.log(uplogo);
        setupLogo(false);
      });
  }, [user?.email, uplogo]);

  useEffect(() => {
    setisLoading(true);
    fetch(
      `https://next-backend-17akbmwng-shaon1028.vercel.app/menu?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setisLoading(false);
        console.log(uplogo);
        setupLogo(false);
      });
  }, [user?.email, uplogo]);
  console.log("menu", menu?.menuname);
  return (
    <div className="container mb-2 ">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary  sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src={user ? data?.logo : ""}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top me-2"
            />
            {user ? (
              <span className="fw-semibold text-warning fst-italic">
                {data?.name}
              </span>
            ) : (
              <span className="text-danger">not found</span>
            )}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link " href="/">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>

              {menu?.menuname.map((item, idx) => (
                <li key={idx} className="nav-item ">
                  {user && (
                    <Link className="nav-link " href="/about">
                      {item}
                    </Link>
                  )}
                </li>
              ))}
              {user ? (
                <li className="nav-item">
                  <Link className="nav-link " href="/dashboard">
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {user?.email ? (
              <>
                <button
                  onClick={handleLogOut}
                  type="button"
                  className="btn btn-sm btn-danger"
                >
                  SignOut
                </button>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link className="nav-link" href="/login">
                  <button type="button" className="btn btn-sm btn-outline-info">
                    Sign In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
