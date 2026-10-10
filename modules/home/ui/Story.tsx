import Image from 'next/image'
import React from 'react'
import { BsArrowRight } from 'react-icons/bs'

const Story = () => {
    return (
        <section className="story-section" id="story">
            <div className="story-image">
                <Image
                    src="/2.jpeg"
                    alt="A baker preparing fresh ingredients in a bright kitchen"
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                />
                <span className="story-image-label">A little flour, a lot of love.</span>
            </div>
            <div className="story-copy">
                <p className="eyebrow"><span /> From our kitchen to your table</p>
                <h2>Every cake tells<br />a <em>sweet story.</em></h2>

                <p>
                    At <strong>Sweet Wishes</strong>, our journey officially started in 2021, but the seed was planted years ago around our family kitchen table. Growing up, family celebrations were never complete without my mother&apos;s magic watching her transform simple ingredients into edible art and carefully swirl every layer of icing. Having refined her craft through professional baking classes back in the day, she passed down her passion and secrets to us.
                </p>

                <p>
                    Over time, we blended those cherished homemade traditions with modern techniques and creative global flavors. Today, <strong>Sweet Wishes</strong> is a celebration of that legacy. From our kitchen to your special moments, we bake with the same love, warmth, and attention to detail that started right at home.
                </p>

                <a className="text-link" href="#contact">Get in touch with us <BsArrowRight /></a>
                <div className="signature">With love, <em>The Sweet Wishes team</em></div>
            </div>
        </section>
    )
}

export default Story