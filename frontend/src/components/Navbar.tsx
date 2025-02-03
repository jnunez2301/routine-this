import { Link, useLocation } from "@tanstack/react-router";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Logo from "./Logo";

type NavLink = {
  href: string;
  component?: React.FC; // If the component is provided it will replace the "label"
  label?: string;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lineStyle, setLineStyle] = useState({ width: "0px", left: "0px" });
  const links: NavLink[] = [
    { href: "/app/routines", label: "Routines" },
    { href: "/app/exercises", label: "Exercises" },
    { href: "/app/settings", label: "Settings" },
  ];
  const location = useLocation();
  const navRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Update the line position and width based on the active link
  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector(
        `a[href="${location.pathname}"]`
      ) as HTMLElement;
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setLineStyle({
          width: `${offsetWidth}px`,
          left: `${offsetLeft}px`,
        });
      }
    }
  }, [location.pathname]);

  return (
    <nav id="nav-bar" className="flex justify-between p-3 relative">
      <Link to="/">
        <Logo />
      </Link>

      {/* Burger Icon */}
      <button
        className="block md:hidden text-amber-900 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Desktop Menu */}
      <ul ref={navRef} className="hidden md:flex gap-3 relative">
        {links.map((l) => (
          <Link
            key={uuidv4()}
            to={l.href}
            className={`text-amber-900 px-3 py-1 transition-all hover:text-amber-600 relative`}
          >
            {l.label}
          </Link>
        ))}
        {/* Animated Line */}
        <div
          className="absolute bottom-0 h-0.5 bg-amber-700 transition-all duration-300"
          style={lineStyle}
        />
      </ul>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-white z-50 transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-amber-900 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <ul className="flex flex-col gap-3 p-5">
            {links.map((l) => (
              <Link
                key={uuidv4()}
                to={l.href}
                className={`text-amber-900 px-3 py-1 transition-all hover:text-amber-600`}
                onClick={toggleMenu}
              >
                {l.component ? <l.component /> : l.label}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;