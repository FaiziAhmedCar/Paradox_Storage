"use client";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src={"/logo1.png"}
          alt="Logo"
          width={140}
          height={50}
          className="hidden h-auto lg:block"
        />

        <Image
          src={"/logo1.png"}
          alt="Logo"
          width={50}
          height={50}
          className="lg:hidden "
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-4 ">
          {navItems.map(({ name, icon, url }) => {
            return (
              <Link href={url} key={name} className="lg:w-full">
                <li
                  className={cn(
                    "sidebar-nav-item",
                    pathname === url && "shad-active"
                  )}
                >
                  <Image
                    src={icon}
                    alt={name}
                    height={24}
                    width={24}
                    className={cn(
                      "nav-icon",
                      pathname === url && "nav-icon-active"
                    )}
                  />
                  <p>{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
