"use client";
import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.jsx";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image
          width={20}
          height={20}
          alt=""
          src="https://images.pexels.com/photos/17845/pexels-photo.jpg"
          className={styles.logoImg}
        />
        Nextify
      </Link>
      <div className={styles.links}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        <button
          className={styles.logout}
          onClick={() => {
            console.log("Logged out");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
