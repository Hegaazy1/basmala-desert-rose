"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Find Photos", href: "/find-photos" },
    { name: "Gallery", href: "/gallery" },
    { name: "Videos", href: "/videos" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-yellow-500/20">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-10 py-4">

        <Link href="/">
          <Image
            src="/logo/logo.png"
            alt="Logo"
            width={220}
            height={80}
            priority
            className="hover:scale-105 transition duration-300"
          />
        </Link>

        <nav className="flex items-center gap-8 text-lg font-semibold">

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

      </div>

    </header>
  );
}