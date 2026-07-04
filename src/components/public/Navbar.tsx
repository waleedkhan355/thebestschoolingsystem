import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notifications", label: "Notices" },
  { href: "/events", label: "Events" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[hsl(152_55%_14%)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 p-0.5 overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform">
              <img src="/logo-crest.svg?v=3" className="w-full h-full object-contain" alt="YOSU Logo" />
            </div>
            <div className="leading-tight">
              <p className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">YOSU INTERNATIONAL</p>
              <p className="text-[hsl(43_90%_52%)] text-[10px] sm:text-xs font-medium tracking-widest uppercase">Deolai, Swat</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location === link.href
                    ? "bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)] font-semibold"
                    : "text-green-100 hover:bg-[hsl(152_45%_22%)] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-3 px-4 py-2 bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)] rounded-md text-sm font-semibold hover:bg-[hsl(43_90%_45%)] transition-colors"
            >
              Admin
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-green-100 hover:bg-[hsl(152_45%_22%)]"
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[hsl(152_55%_12%)] border-t border-[hsl(152_40%_20%)]"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === link.href
                      ? "bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)] font-semibold"
                      : "text-green-100 hover:bg-[hsl(152_45%_22%)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-semibold bg-[hsl(43_90%_52%)] text-[hsl(152_55%_10%)]"
              >
                Admin Desk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
