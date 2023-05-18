"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/UserContext";
import toast from "react-hot-toast";
import Link from "next/link";
const RegisterPage = () => {
  const { signInWithGoogle, createUser } = useContext(AuthContext);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    createUser(email, password)
      .then((results) => {
        const user = results.user;
        console.log(user);
        saveUser(email);

        form.reset();
      })
      .catch((error) => console.log(error));
  };
  const saveUser = (email) => {
    const user = { email };
    fetch("https://next-backend-17akbmwng-shaon1028.vercel.app/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("User Created Successfully.");
        router.push("/");
      });
  };
  // ----------------Google-------------

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((results) => {
        const user = results.user;
        console.log(user);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div>
      <div>
        <h5 className="text-center mt-5">Sign up</h5>
        <div className="d-flex justify-content-center mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label for="InputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="InputPassword"
              />
              <small className="mt-2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary text-decoration-none  fw-bold"
                >
                  SignIn
                </Link>
              </small>
            </div>

            <input
              className="btn btn-primary w-100"
              type="submit"
              value="Submit"
            ></input>
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline-dark w-100 mt-2"
            >
              Sign in with <FcGoogle />{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
