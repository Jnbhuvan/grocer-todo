"use client";

import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-green-700 shadow-md  top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex title-font font-bold items-center text-white text-2xl"
        >
          <span className="ml-3">Groceries List Dashboard</span>
        </Link>

        {/* Navigation Links */}
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-5">
          <Link
            href="/"
            className="text-white hover:text-yellow-600 font-medium"
          >
            Home
          </Link>
          <Link
            href="/add-product"
            className="text-white hover:text-yellow-600 font-medium"
          >
            Add Product
          </Link>
        </nav>

        {/* Optional Action Button */}
        {/* <Link
          href="/add-product"
          className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Add Product
        </Link> */}
      </div>
    </header>
  );
};

export default Navbar;
