import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Hero from "@/modules/home/ui/Hero";
import Categories from "@/modules/home/ui/Categories";
import Story from "@/modules/home/ui/Story";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <section className="quick-links" aria-label="Explore Sweet Wishes">
        <Link className="quick-card" href="/shop">
          <span className="quick-icon icon-cake">✳</span>
          <span><strong>Made for you</strong><small>Custom cakes, your way</small></span>
          <BsArrowRight />
        </Link>
        <Link className="quick-card" href="/shop">
          <span className="quick-icon icon-box">♡</span>
          <span><strong>Little sweet things</strong><small>Our everyday favorites</small></span>
          <BsArrowRight />
        </Link>
        <a className="quick-card" href="#contact">
          <span className="quick-icon icon-whisk">✿</span>
          <span><strong>Let&apos;s celebrate</strong><small>Something lovely is coming</small></span>
          <BsArrowRight />
        </a>
      </section>

      <Categories />

      <Story />

      <section className="contact-strip" id="contact">
        <div>
          <p className="eyebrow"><span /> Have a sweet idea?</p>
          <h2>Let&apos;s make <em>your day.</em></h2>
        </div>
        <a className="button button-light" href="https://wa.me/94716091425">
          Chat on WhatsApp
          <BsArrowRight />
        </a>
      </section>

      <Footer />
    </main>
  );
}
