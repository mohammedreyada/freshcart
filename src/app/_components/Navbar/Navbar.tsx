"use client";

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

export default function Navbar() {

let {numberOfItems, setNumberOfItems} = useContext(CartContext)!

  const { data: session, status } = useSession();
  

  function logOut() {
    signOut({ callbackUrl: "/Login" });
  }

  return (
    <nav className="sticky top-0 z-50 bg-emerald-600/90 backdrop-blur-md text-white shadow-lg flex start-0 top-0 end-0">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between">

        {/* LEFT */}
        <div className="left">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 items-center text-center">

            {/* LOGO */}
            <li className="text-2xl font-bold">
              <Link
                href="/"
                className="group flex items-center gap-2 hover:text-emerald-200 transition"
              >
                <i className="fa-solid fa-cart-arrow-down group-hover:rotate-[-10deg] transition-transform"></i>
                <span className="relative">
                  Fresh Cart
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </li>

            {/* LINKS */}
            {["Home", "Products", "Categories", "Brands", "wishlist"].map((item) => (
              <li key={item} className="relative group hover:text-emerald-200 transition">
                <Link href={`/${item === "Home" ? "" : item}`}>
                  {item}
                </Link>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-200 transition-all group-hover:w-full" />
              </li>
            ))}

            {/* CART */}
            {session && (
              <li className="relative">
                <Link
                  href="/cart"
                  className="group relative flex items-center gap-2 font-semibold hover:text-emerald-300 transition"
                >
                  <span className="relative">
                    Cart
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-300 transition-all group-hover:w-full" />
                  </span>

                  <div className="relative">
                    <ShoppingCart
                      size={22}
                      className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    />

                  {numberOfItems > 0 && (
  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[11px] font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md animate-pulse">
    {numberOfItems}
  </span>
)}

                    
                   
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="right mt-4 md:mt-0">
          <ul className="flex flex-wrap justify-center md:justify-end gap-4 items-center">

            {!session ? (
              <>
                {["facebook-f", "twitter", "youtube", "instagram", "linkedin"].map((icon) => (
                  <li
                    key={icon}
                    className="cursor-pointer hover:scale-110 hover:text-emerald-200 transition"
                  >
                    <i className={`fa-brands fa-${icon}`}></i>
                  </li>
                ))}

                <li className="hover:text-emerald-200 transition">
                  <Link href="/Login">Login</Link>
                </li>

                <li className="border border-white/60 px-4 py-1 rounded-full hover:bg-white hover:text-emerald-600 transition">
                  <Link href="/Register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={logOut}
                  className="hidden md:block cursor-pointer px-3 py-1 rounded-full border border-white/40 hover:bg-white hover:text-emerald-600 transition"
                >
                  SignOut
                </li>

                <li className="hidden md:block font-semibold tracking-wide">
                  Hallo <span className="text-emerald-200">{session?.user.name}</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
