"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Chart", path: "/chart" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Budget", path: "/budget" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { setTheme } = useTheme();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white/80 via-slate-300/60 to-white/80 backdrop-blur-md border-b border-slate-200 dark:from-slate-900/80 dark:via-slate-800/60 dark:to-slate-900/80 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-all"
        >
          Transaction Tracker
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
          {navLinks.slice(0, 4).map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`hover:text-indigo-500 transition-colors ${
                  isActive(link.path)
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & Mobile Menu Icon */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 dark:text-slate-200" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 animate-slide-down">
          <ul className="space-y-3 text-gray-700 dark:text-gray-200 font-medium">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={() => setIsOpen(false)} // close menu on click
                  className={`block hover:text-indigo-500 transition-colors ${
                    isActive(link.path)
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
