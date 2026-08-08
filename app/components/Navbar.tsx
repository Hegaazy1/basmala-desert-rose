"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Photos", href: "/find-photos" },
    { name: "Gallery", href: "/gallery" },
    { name: "Videos", href: "/videos" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-black text-white border-b border-yellow-500/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10 py-4">

        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo/logo.png"
            alt="Logo"
            width={220}
            height={80}
            priority
            className="w-[150px] md:w-[220px] h-auto hover:scale-105 transition duration-300"
          />
        </Link>

        {/* Desktop Menu - نفس الشكل */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-semibold">

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition duration-300 ${
                pathname === item.href
                  ? "text-yellow-400"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/admin"
            className={`px-5 py-2 rounded-full transition duration-300 ${
              pathname === "/admin"
                ? "bg-yellow-400 text-black"
                : "bg-yellow-500 text-black hover:bg-yellow-400"
            }`}
          >
            Admin
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl px-2"
          aria-label="Open menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-black border-t border-yellow-500/30 px-5 py-4">

          <div className="flex flex-col gap-4 text-lg font-semibold">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`py-2 transition duration-300 ${
                  pathname === item.href
                    ? "text-yellow-400"
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className={`text-center px-5 py-3 rounded-full transition duration-300 ${
                pathname === "/admin"
                  ? "bg-yellow-400 text-black"
                  : "bg-yellow-500 text-black"
              }`}
            >
              Admin
            </Link>

          </div>

        </nav>
      )}
    </header>
  );
}