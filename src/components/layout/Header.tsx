'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Phone, MessageCircle, MapPin, Menu, X, ShieldCheck, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const syncAdminAuth = async () => {
      try {
        const response = await fetch('/api/admin/session', { cache: 'no-store' });
        const data = await response.json();
        setIsAdminLoggedIn(Boolean(data.authenticated));
      } catch {
        setIsAdminLoggedIn(false);
      }
    };

    syncAdminAuth();
    window.addEventListener('mata-admin-auth', syncAdminAuth);

    return () => {
      window.removeEventListener('mata-admin-auth', syncAdminAuth);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.dispatchEvent(new Event('mata-admin-auth'));
    setIsAdminLoggedIn(false);
    setIsMenuOpen(false);
    router.push('/admin');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top bar for contact info */}
      <div className="bg-[#06112C] py-2 text-white">
        <div className="container mx-auto flex flex-wrap justify-between px-4 text-xs md:text-sm">
          <div className="flex space-x-4">
            <a href="tel:+918080673647" className="flex items-center space-x-1 hover:text-secondary-light">
              <Phone size={14} />
              <span>080806 73647</span>
            </a>
            <a href="https://wa.me/918080673647" className="flex items-center space-x-1 hover:text-secondary-light">
              <MessageCircle size={14} />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
          <div className="hidden items-center space-x-1 md:flex">
            <MapPin size={14} />
            <span>Kopar Khairane, Navi Mumbai</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-2 md:py-3">
        <Link href="/" className="flex items-center gap-2 md:gap-2.5 transition-transform active:scale-95">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/mata_logo_gold.svg"
            alt="Mata Refrigeration Logo"
            className="h-8 w-8 md:h-10 md:w-10 object-contain"
          />
          <span className="text-sm font-black tracking-tight text-[#06112C] md:text-lg uppercase">
            Mata <span className="text-accent">Refrigeration</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden space-x-8 font-medium lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={`relative transition-all duration-200 active:scale-90 py-1 ${isActive
                    ? 'text-primary font-bold'
                    : 'text-gray-600 hover:text-primary'
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/admin"
            aria-label="Admin login"
            title="Admin login"
            className="hidden h-10 w-10 items-center justify-center rounded-md border border-primary text-primary transition-colors hover:bg-primary hover:text-white md:flex"
          >
            <ShieldCheck size={20} />
          </Link>

          {isAdminLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hidden items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:bg-accent-dark active:scale-95 md:flex"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              href="/contact"
              className="hidden rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark md:block transition-transform active:scale-95"
            >
              Request Quote
            </Link>
          )}

          {/* Burger Menu Button */}
          {!isMenuOpen && (
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#06112C] p-2 text-white lg:hidden z-[101] shadow-xl"
              onClick={() => {
                setIsMenuOpen(true);
              }}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[99] bg-black lg:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 z-[100] flex w-[75vw] max-w-[320px] flex-col bg-white shadow-2xl lg:hidden h-full overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold text-primary tracking-tight">MENU</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-5 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-lg font-bold py-3.5 border-b border-gray-50 flex justify-between items-center transition-colors ${
                        isActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {link.name}
                      {isActive && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </Link>
                  );
                })}

                {/* CTA Button */}
                {isAdminLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3.5 text-sm font-bold text-white shadow-md hover:bg-accent-dark transition-all active:scale-[0.98]"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-6 block w-full bg-accent text-white text-center py-3.5 rounded-lg text-sm font-bold shadow-md hover:bg-accent-dark transition-all active:scale-[0.98]"
                  >
                    Request Quote
                  </Link>
                )}

                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-primary py-3.5 text-sm font-bold text-primary hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                  <ShieldCheck size={18} />
                  Admin Login
                </Link>

                {/* Quick Contact Info */}
                <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Direct Contact</p>
                  <a href="tel:+918080673647" className="flex items-center gap-3 text-gray-700 font-bold text-sm hover:text-primary transition-colors">
                    <div className="bg-primary/5 p-2.5 rounded-full text-primary">
                      <Phone size={18} />
                    </div>
                    080806 73647
                  </a>
                  <a href="https://wa.me/918080673647" className="flex items-center gap-3 text-gray-700 font-bold text-sm hover:text-green-600 transition-colors">
                    <div className="bg-green-50 p-2.5 rounded-full text-green-600">
                      <MessageCircle size={18} />
                    </div>
                    WhatsApp Enquiry
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}


