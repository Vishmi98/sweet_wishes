"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="announcement-bar">
        <p>Thoughtfully baked, joyfully delivered</p>
        <Link href="/#contact">A little note from us <span>↗</span></Link>
      </div>

      <header className="site-header">
        <Link className="wordmark" href="/#home" aria-label="Sweet Wishes home">
          <Image
            src="/logo.png"
            alt="Sweet Wishes - Cake & Dessert"
            width={150}
            height={60}
            priority
            className="h-[72px] w-auto object-contain transition-opacity group-hover:opacity-90"
          />
        </Link>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"}>
          <Link href="/#home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Our cakes</Link>
          <Link href="/#story" onClick={() => setMenuOpen(false)}>Our story</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>Say hello</Link>
        </nav>
        <a
          className="button button-dark nav-order-link"
          href="https://wa.me/94716091425?text=Hi%20Sweet%20Wishes!%20I%27d%20like%20to%20place%20an%20order."
          target="_blank"
          rel="noreferrer"
        >
          Order on WhatsApp
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>
    </>
  );
}
