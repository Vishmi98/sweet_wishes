"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { GENERAL_WEBSITE_ORDER_MESSAGE } from "@/constants/pricing";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const isActive = (href: string) => {
    const [path, hash] = href.split("#");

    if (pathname !== path) {
      return !hash && pathname.startsWith(`${path}/`);
    }

    return hash
      ? activeHash === `#${hash}` || (!activeHash && hash === "home")
      : true;
  };

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setActiveHash(href.includes("#") ? `#${href.split("#")[1]}` : "");
  };

  return (
    <>
      <div className="flex min-h-9 items-center justify-between bg-[#382d2b] px-[6.1%] text-[10px] tracking-[.075em] text-[#f8f4ec] max-[700px]:min-h-8 max-[700px]:justify-center max-[700px]:px-4 max-[700px]:text-[9px]">
        <p className="m-0">Thoughtfully baked, joyfully delivered</p>
        <Link className="text-[#e8c3b9] max-[700px]:hidden" href="/#contact">
          A little note from us <span className="ml-[5px] text-white">↗</span>
        </Link>
      </div>

      <header className="relative z-[5] flex h-[88px] items-center justify-between border-b border-[rgba(53,42,41,.055)] bg-[var(--paper)] px-[6.1%] max-[700px]:h-[70px] max-[700px]:px-[6%]">
        <Link
          className="shrink-0 whitespace-nowrap font-[Georgia,Times_New_Roman,serif] text-[27px] font-medium tracking-[-.07em] max-[700px]:text-2xl"
          href="/#home"
          aria-label="Sweet Wishes home"
        >
          <Image
            src="/logo.png"
            alt="Sweet Wishes - Cake & Dessert"
            width={150}
            height={60}
            priority
            className="h-[72px] w-auto object-contain transition-opacity hover:opacity-90"
          />
        </Link>
        <nav
          className={`flex items-center gap-[clamp(25px,4vw,60px)] ml-[7%] max-[700px]:absolute max-[700px]:top-[70px] max-[700px]:right-0 max-[700px]:left-0 max-[700px]:z-10 max-[700px]:ml-0 max-[700px]:items-stretch max-[700px]:gap-0 max-[700px]:bg-[var(--paper)] max-[700px]:px-[6%] max-[700px]:py-[8px] max-[700px]:pb-[17px] max-[700px]:shadow-[0_15px_20px_rgba(53,42,41,.08)] ${menuOpen ? "max-[700px]:!flex max-[700px]:flex-col" : "max-[700px]:hidden"}`}
        >
          <Link
            href="/#home"
            className={`font-[Georgia,Times_New_Roman,serif] text-[13px] transition-colors hover:text-[var(--rose-dark)] max-[700px]:border-b max-[700px]:border-[var(--line)] max-[700px]:py-[13px] max-[700px]:last:border-0 ${isActive("/#home") ? "text-[var(--rose-dark)]" : ""}`}
            aria-current={isActive("/#home") ? "location" : undefined}
            onClick={() => handleNavClick("/#home")}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`font-[Georgia,Times_New_Roman,serif] text-[13px] transition-colors hover:text-[var(--rose-dark)] max-[700px]:border-b max-[700px]:border-[var(--line)] max-[700px]:py-[13px] max-[700px]:last:border-0 ${isActive("/shop") ? "text-[var(--rose-dark)]" : ""}`}
            aria-current={isActive("/shop") ? "page" : undefined}
            onClick={() => handleNavClick("/shop")}
          >
            Our cakes
          </Link>
          <Link
            href="/#story"
            className={`font-[Georgia,Times_New_Roman,serif] text-[13px] transition-colors hover:text-[var(--rose-dark)] max-[700px]:border-b max-[700px]:border-[var(--line)] max-[700px]:py-[13px] max-[700px]:last:border-0 ${isActive("/#story") ? "text-[var(--rose-dark)]" : ""}`}
            aria-current={isActive("/#story") ? "location" : undefined}
            onClick={() => handleNavClick("/#story")}
          >
            Our story
          </Link>
          <Link
            href="/blogs"
            className={`font-[Georgia,Times_New_Roman,serif] text-[13px] transition-colors hover:text-[var(--rose-dark)] max-[700px]:border-b max-[700px]:border-[var(--line)] max-[700px]:py-[13px] max-[700px]:last:border-0 ${isActive("/blogs") ? "text-[var(--rose-dark)]" : ""}`}
            aria-current={isActive("/blogs") ? "page" : undefined}
            onClick={() => handleNavClick("/blogs")}
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            className={`font-[Georgia,Times_New_Roman,serif] text-[13px] transition-colors hover:text-[var(--rose-dark)] max-[700px]:border-b max-[700px]:border-[var(--line)] max-[700px]:py-[13px] max-[700px]:last:border-0 ${isActive("/#contact") ? "text-[var(--rose-dark)]" : ""}`}
            aria-current={isActive("/#contact") ? "location" : undefined}
            onClick={() => handleNavClick("/#contact")}
          >
            Say hello
          </Link>
        </nav>
        <a
          className="button button-dark ml-[4%] min-h-[41px] gap-[10px] whitespace-nowrap px-[15px] text-[9px] max-[700px]:ml-auto max-[700px]:min-h-9 max-[700px]:gap-1.5 max-[700px]:px-[9px] max-[700px]:text-[8px]"
          href={`https://wa.me/94716091425?text=${GENERAL_WEBSITE_ORDER_MESSAGE}`}
          target="_blank"
          rel="noreferrer"
        >
          Order on WhatsApp
        </a>
        <button
          className="ml-2 hidden h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1.5 border-0 bg-transparent p-0 max-[700px]:flex"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="h-px w-5 bg-[var(--ink)]" />
          <span className="h-px w-5 bg-[var(--ink)]" />
        </button>
      </header>
    </>
  );
}
