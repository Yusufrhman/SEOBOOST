"use client";

import MainButton from "@/components/buttons/main-button";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [isShow, setIsShow] = useState(false);
  return (
    <main className="bg-gradient-to-b from-custom-black to-neutral-800 min-h-[100svh] flex items-center justify-center">
      <form action="">
        <article className="bg-transparent px-16 py-8 text-center flex flex-col items-center justify-center gap-[1rem] max-w-[32rem]">
          <h1 className="mx-auto w-full text-center font-bold text-2xl text-white">
            Log in to your account
          </h1>
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
          <MainButton
            classes="w-full font-bold"
            layoutId="login-button"
            style={{ originY: "0px" }}
          >
            Login
          </MainButton>
          <p className="text-white font-light">
            Dont have account?{" "}
            <Link href="signup">
              <button className="text-custom-teal">Sign Up</button>
            </Link>
          </p>
        </article>
      </form>
    </main>
  );
}
