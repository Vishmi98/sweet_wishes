import Image from 'next/image'
import React from 'react'
import { BiHeart } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'

const Hero = () => {
    return (
        <section className="hero" id="home">
            <div className="hero-copy">
                <p className="eyebrow"><span /> Baked for the lovely little moments</p>
                <h1>A little slice<br />of <em>something lovely.</em></h1>
                <p className="hero-description">
                    Small batch cakes made by hand, with the good stuff and a whole lot
                    of heart. Because every day deserves a little celebration.
                </p>
                <div className="hero-actions">
                    <a className="button button-dark" href="#shop">
                        Find your favorite <BsArrowRight />
                    </a>
                    <a className="text-link" href="#story">Get to know us</a>
                </div>
                <div className="hero-note">
                    <span className="note-stars">★★★★★</span>
                    <span>Loved by the neighborhood since 2021</span>
                </div>
            </div>
            <div className="hero-art">
                <div className="hero-image-wrap">
                    <Image
                        src="/1.png"
                        alt="A freshly frosted celebration cake topped with berries"
                        fill
                        priority
                        sizes="(max-width: 700px) 90vw, 45vw"
                    />
                </div>
                <div className="hero-sticker"><BiHeart /><span>made<br />with love</span></div>
                <div className="hero-caption"> A very good reason to celebrate</div>
            </div>
            <div className="hero-side-note">FRESH FROM OUR LITTLE OVEN · EST. 2021</div>
        </section>
    )
}

export default Hero