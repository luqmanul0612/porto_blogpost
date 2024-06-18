"use client";

import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Home, Users } from "lucide-react";

const menu = [
  { label: "Home", pathname: "/", icon: Home },
  { label: "Users", pathname: "/users", icon: Users },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className={styles.NavbarRoot}>
      <div className={styles.navbarContent}>
        <div className={styles.logo} onClick={() => router.push("/")}>
          <div>B</div>
          <p>Blog Post</p>
        </div>
        <div className={styles.menu}>
          <div>
            {menu.map((item) => (
              <Link
                key={item.pathname}
                href={item.pathname}
                className={styles.link}
              >
                <div
                  className={clsx(styles.menuItem, {
                    [styles.active]: pathname === item.pathname,
                  })}
                >
                  <item.icon size={22} className={styles.icon} />
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
