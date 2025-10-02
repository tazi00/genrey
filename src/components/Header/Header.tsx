"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#docs", label: "Docs" },
  { href: "#blog", label: "Blog" },
  { href: "/admin", label: "Admin" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    function onKey(e: { key: string }) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Home"
          >
            <span className="text-base font-semibold tracking-tight">
              Genrey
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold bg-neutral-900 text-white hover:opacity-90 active:opacity-80 dark:bg-white dark:text-neutral-900"
            >
              Contact
            </a>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10"
            >
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile sidebar */}
      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85%] bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white min-h-screen shadow-xl
          transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="text-base font-semibold tracking-tight text-background">
              Genrey
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/10"
          >
            <span className="sr-only">Close menu</span>
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="px-2 py-4 bg-[#474747]" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-background hover:bg-black/5 dark:hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}

          <div className="mt-2 border-t border-black/5 dark:border-white/5" />

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg px-3 py-2 text-sm font-semibold bg-neutral-900 text-white text-center dark:bg-white dark:text-neutral-900"
          >
            Contact
          </a>
        </nav>
      </aside>
    </header>
  );
}
