"use client";
import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
const LoginPage = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((results) => {
        const user = results.user;
        console.log(user);

        router.push("/");
      })
      .catch((error) => setError(error.message));
  };
  // ----------------Google-------------

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((results) => {
        const user = results.user;
        console.log(user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h5 className="text-center mt-5">Log In</h5>
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
              className="form-control"
              id="InputPassword"
              name="password"
            />
            <small className="mt-2">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary text-decoration-none  fw-bold"
              >
                SignUp
              </Link>
            </small>
          </div>
          <input
            className="btn btn-primary w-100"
            type="submit"
            value="Submit"
          ></input>
          <button type="button" className="btn btn-outline-dark w-100 mt-2">
            Sign in with <FcGoogle />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
