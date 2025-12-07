import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Research", href: "/research" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const initialTheme = savedTheme || (mediaQuery.matches ? "dark" : "light");
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Listen for system theme changes only if no saved preference
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled || router.pathname !== "/"
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          <img src="logo_no_bg.png" alt="logo image" className="h-8 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                router.pathname === link.href
                  ? "text-primary-600 font-bold"
                  : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-primary-600"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          )}
          <Link
            href="/contact"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-transform hover:bg-slate-800 hover:scale-105"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          )}
          <button onClick={handleMobileMenuToggle}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white border-b border-slate-100 md:hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`text-base font-medium text-left ${
                    router.pathname === link.href
                      ? "text-primary-600"
                      : "text-slate-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
