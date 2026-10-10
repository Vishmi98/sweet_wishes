"use client"

import { useState } from 'react'
import Link from "next/link";
import { BsArrowRight } from 'react-icons/bs';

import { cakes, filters } from '@/constants/data'
import CakeCard from '@/modules/shop/ui/CakeCard'

const Categories = () => {
    const [activeFilter, setActiveFilter] = useState("All treats");

    const visibleCakes =
        activeFilter === "All treats"
            ? cakes
            : cakes.filter((cake) => cake.category === activeFilter);

    return (
        <section className="shop-section" id="shop">
            <div className="section-heading">
                <div>
                    <p className="eyebrow"><span /> A few of our favorites</p>
                    <h2>Good things,<br className="mobile-break" /> <em>freshly baked.</em></h2>
                </div>
                <p className="section-intro">
                    The kind of cake that makes you close your eyes at the first bite.
                    Find your new favorite below.
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
                <a className="text-link all-link" href="#contact">Need something custom? <BsArrowRight /></a>
            </div>
            <div className="cake-grid">
                {visibleCakes.map((cake) => (
                    <CakeCard cake={cake} index={cakes.indexOf(cake)} key={cake.slug} />
                ))}
            </div>
            <div className="shop-bottom">
                <span>Handmade in small batches, always.</span>
                <Link className="button button-outline" href="/shop">See all the good stuff <BsArrowRight /></Link>
            </div>
        </section>
    )
}

export default Categories