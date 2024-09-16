"use client";

import MainButton from "@/components/buttons/main-button";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  return (
    <main className="bg-gradient-to-b from-custom-black to-neutral-800 min-h-[100svh] flex items-center justify-center">
      <form action="">
        <article className="bg-transparent px-16 py-8 text-center flex flex-col items-center justify-center gap-[1rem] w-[32rem]">
          <h1 className="mx-auto w-full text-center font-bold text-2xl text-white">
            Register a new account
          </h1>
          <input
            type="name"
            placeholder="Full Name"
            className="block w-full px-4 py-2 rounded-lg bg-transparent border border-teal-50 text-white focus:outline-none focus:border-custom-teal"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="block w-full px-4 py-2 rounded-lg bg-transparent border border-teal-50 text-white focus:outline-none focus:border-custom-teal"
            required
          />
          <div className="relative w-full">
            <input
              type={isShow ? "text" : "Password"}
              placeholder="Password"
              className="block w-full px-4 py-2 rounded-lg bg-transparent border border-teal-50 text-white focus:outline-none focus:border-custom-teal"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-0 bottom-0 text-white"
              onClick={() => setIsShow((prevIsShow) => !prevIsShow)}
            >
              {isShow ? (
                <i class="fa fa-eye-slash"></i>
              ) : (
                <i class="fa fa-eye"></i>
              )}
            </button>
          </div>
          <div className="relative w-full">
            <input
              type={isShowConfirm ? "text" : "Password"}
              placeholder="Confirm Password"
              className="block w-full px-4 py-2 rounded-lg bg-transparent border border-teal-50 text-white focus:outline-none focus:border-custom-teal"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-0 bottom-0 text-white"
              onClick={() => setIsShowConfirm((prevIsShow) => !prevIsShow)}
            >
              {isShowConfirm ? (
                <i class="fa fa-eye-slash"></i>
              ) : (
                <i class="fa fa-eye"></i>
              )}
            </button>
          </div>
          <MainButton
            classes="w-full font-bold"
            layoutId="login-button"
            style={{ originY: "0px" }}
          >
            Sign Up
          </MainButton>
          <p className="text-white font-light">
            Already have account?{" "}
            <Link href="login">
              <button className="text-custom-teal">Log in</button>
            </Link>
          </p>
        </article>
      </form>
    </main>
  );
}
