import Link from "next/link";

export default function ReverseButton({ children }) {
    return (

        <button className="w-40 h-10 rounded-xl border-none bg-white text-black text-sm hover:shadow-[0_0_10px_0_white] transition-shadow">
          {children}
        </button>

    );
}