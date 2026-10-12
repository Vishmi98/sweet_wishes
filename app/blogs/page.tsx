import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { blogs } from "@/constants/blogs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Stories from our kitchen | Sweet Wishes",
  description:
    "Read the Sweet Wishes journal for baking inspiration, celebration ideas, and little notes from our kitchen.",
};

export default function BlogsPage() {
  const [featuredBlog, ...moreBlogs] = blogs;

  return (
    <main>
      <Navbar />
      <section className="px-[10.2%] pt-[72px] pb-[90px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-12 max-[700px]:pb-[62px]">
        <div className="mx-auto mb-[46px] max-w-[670px] text-center max-[700px]:mb-[30px]">
          <p className="eyebrow justify-center"><span /> The Sweet Wishes journal</p>
          <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(43px,5vw,68px)] font-normal leading-[1.08] tracking-[-.055em] max-[700px]:text-[46px]">
            Little stories, <em className="font-normal text-[var(--rose)]">lots of heart.</em>
          </h1>
          <p className="mx-auto mt-[18px] mb-0 max-w-[510px] text-xs leading-[1.8] text-[#827671]">
            A few notes from our kitchen: thoughtful bakes, celebration ideas,
            and all the little things that make a moment sweet.
          </p>
        </div>

        <article className="grid grid-cols-[1.1fr_.9fr] items-center bg-[var(--cream)] max-[700px]:grid-cols-1">
          <Link className="group relative block min-h-[410px] overflow-hidden bg-[#f1e8df] max-[1000px]:min-h-[350px] max-[700px]:aspect-[1.35] max-[700px]:min-h-0" href={`/blogs/${featuredBlog.slug}`}>
            <Image
              src={featuredBlog.image}
              alt={featuredBlog.imageAlt}
              fill
              priority
              sizes="(max-width: 700px) 90vw, 52vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]"
            />
          </Link>
          <div className="px-[clamp(28px,5vw,72px)] py-[46px] max-[700px]:px-[23px] max-[700px]:pt-7 max-[700px]:pb-8">
            <p className="m-0 flex flex-wrap gap-x-[14px] gap-y-2 text-[9px] tracking-[.04em] text-[#938680]">
              <span className="text-[var(--rose-dark)] uppercase">{featuredBlog.category}</span>
              <span>{featuredBlog.date}</span>
            </p>
            <h2 className="mt-[17px] mb-3 font-[Georgia,Times_New_Roman,serif] text-[clamp(30px,3.2vw,43px)] font-normal leading-[1.13] tracking-[-.045em] max-[700px]:text-[34px]">
              <Link href={`/blogs/${featuredBlog.slug}`}>{featuredBlog.title}</Link>
            </h2>
            <p className="m-0 text-[11px] leading-[1.8] text-[#827671]">{featuredBlog.excerpt}</p>
            <Link className="text-link mt-[23px] text-[var(--rose-dark)]" href={`/blogs/${featuredBlog.slug}`}>
              Read the story <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </article>

        <section className="pt-[78px] max-[700px]:pt-[55px]" aria-labelledby="blog-list-heading">
          <div className="section-heading mb-7 max-[700px]:flex max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
            <div>
              <p className="eyebrow"><span /> Fresh from the kitchen</p>
              <h2 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(38px,4vw,52px)] font-normal tracking-[-.05em]">More to <em className="font-normal text-[var(--rose)]">browse.</em></h2>
            </div>
            <p className="m-0 max-w-[290px] text-[11px] leading-[1.8] text-[#827671]">
              A little inspiration for your next celebration, big or small.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-[34px] max-[700px]:grid-cols-1 max-[700px]:gap-7">
            {moreBlogs.map((blog) => (
              <article key={blog.slug}>
                <Link className="group relative block aspect-[1.48] w-full overflow-hidden bg-[#f1e8df] max-[700px]:aspect-[1.4]" href={`/blogs/${blog.slug}`}>
                  <Image
                    src={blog.image}
                    alt={blog.imageAlt}
                    fill
                    sizes="(max-width: 700px) 90vw, 42vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]"
                  />
                </Link>
                <div className="pt-4">
                  <p className="m-0 flex flex-wrap gap-x-[14px] gap-y-2 text-[9px] tracking-[.04em] text-[#938680]">
                    <span className="text-[var(--rose-dark)] uppercase">{blog.category}</span>
                    <span>{blog.date}</span>
                  </p>
                  <h3 className="mt-[11px] mb-2 font-[Georgia,Times_New_Roman,serif] text-[25px] font-normal tracking-[-.025em]"><Link href={`/blogs/${blog.slug}`}>{blog.title}</Link></h3>
                  <p className="m-0 text-[11px] leading-[1.8] text-[#827671]">{blog.excerpt}</p>
                  <Link className="mt-[13px] inline-flex items-center gap-2 text-[10px] text-[var(--rose-dark)]" href={`/blogs/${blog.slug}`}>
                    Read the story <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}
