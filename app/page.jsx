"use client";
import MainButton from "@/components/buttons/main-button";
import ReverseButton from "@/components/buttons/reverse-button";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
export default function Home() {
  const words = [
    {
      text: "Smarter",
    },
    {
      text: "SEO",
    },
    {
      text: "strategies",
    },
    {
      text: "with",
    },
    {
      text: "SEOBoost.",
      className:
        "text-transparent bg-gradient-to-r from-custom-teal to-custom-darkTeal inline-block bg-clip-text",
    },
  ];
  return (
    <main className="bg-gradient-to-b from-custom-black to-neutral-800">
      <BackgroundBeamsWithCollision className="">
        <div className="flex flex-col items-center justify-center z-20 w-[90%]">
          <p className="text-neutral-200 text-xs sm:text-base text-center md:text-left">
            Drive more traffic with our comprehensive keyword analysis and
            optimization tools.
          </p>
          <TypewriterEffectSmooth words={words} className="" />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 font-bold">
            <Link href="login">
              <MainButton  style={{ originY: "0px" }}>
                Login
              </MainButton>
            </Link>
            <Link href="signup">
              <ReverseButton>Signup</ReverseButton>
            </Link>
          </div>
            <Link href="/dashboard" className="text-custom-darkTeal opacity-60 underline mt-[1rem]">Start without logging in</Link>
        </div>
      </BackgroundBeamsWithCollision>
    </main>
  );
}
