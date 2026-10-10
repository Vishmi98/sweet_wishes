"use client";

import { useState } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import CakeCard from "./CakeCard";

import { cakes, filters } from "@/constants/data";

export default function ShopCatalog() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const visibleCakes =
    activeFilter === filters[0]
      ? cakes
      : cakes.filter((cake) => cake.category === activeFilter);

  return (
    <section className="shop-section catalog-section">
      <div className="catalog-breadcrumb">
        <Link href="/">Home</Link><span>/</span><span>Our cakes</span>
      </div>
      <div className="section-heading">
        <div>
          <p className="eyebrow"><span /> A little something for every occasion</p>
          <h1>All the <em>good things.</em></h1>
        </div>
        <p className="section-intro">
          From just-because cupcakes to the cake everyone remembers. Find the
          one that feels like you.
        </p>
      </div>
      <div className="shop-controls">
        <div className="filter-list" aria-label="Filter cakes">
          {filters.map((filter) => (
            <button
              className={activeFilter === filter ? "filter-button active" : "filter-button"}
              type="button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
        <span className="catalog-count">
          {String(visibleCakes.length).padStart(2, "0")} little treats
        </span>
      </div>
      <div className="cake-grid catalog-grid">
        {visibleCakes.map((cake) => (
          <CakeCard cake={cake} index={cakes.indexOf(cake)} key={cake.slug} />
        ))}
      </div>
      <div className="catalog-note">
        <span>Have a special idea in mind?</span>
        <a className="text-link" href="https://wa.me/94716091425">
          Let&apos;s dream it up <BsArrowRight />
        </a>
      </div>
    </section>
  );
}
