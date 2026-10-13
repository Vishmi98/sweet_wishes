import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FiArrowUpRight } from "react-icons/fi";

import { blogs } from "@/constants/blogs";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

// 👇 Allows the route to block normally during navigation and fixes the params error
export const instant = false;

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    return { title: "Story not found | Sweet Wishes" };
  }

  return {
    title: `${blog.title} | Sweet Wishes`,
    description: blog.excerpt,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = blogs.filter((item) => item.slug !== blog.slug).slice(0, 2);

  return (
    <main>
      <Navbar />
      <article className="px-[10.2%] pt-[38px] pb-20 max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-7 max-[700px]:pb-14">
        <nav className="mb-[45px] flex flex-wrap items-center gap-[10px] text-[10px] text-[#938680] max-[700px]:mb-[30px] max-[700px]:gap-[7px] max-[700px]:text-[9px] [&_a:hover]:text-rose-dark" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/blogs">Blog</Link><span>/</span>
          <span aria-current="page">{blog.title}</span>
        </nav>

        <header className="mx-auto mb-[30px] max-w-[790px] text-center">
          <p className="eyebrow mb-[15px] justify-center"><span /> {blog.category}</p>
          <h1 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(42px,5vw,64px)] font-normal leading-[1.08] tracking-[-.055em] max-[700px]:text-[44px]">{blog.title}</h1>
          <p className="mx-auto mt-[17px] mb-[15px] max-w-[650px] font-[Georgia,Times_New_Roman,serif] text-[15px] leading-[1.7] text-[#827671] max-[700px]:text-sm">{blog.excerpt}</p>
          <p className="m-0 flex justify-center gap-3 text-[9px] text-[#938680]">
            <span>{blog.date}</span><span aria-hidden="true" className="text-rose">·</span><span>{blog.readingTime}</span>
          </p>
        </header>

        <div className="relative mx-auto aspect-[1.9] max-w-[1040px] overflow-hidden bg-[#f1e8df] max-[700px]:aspect-[1.2]">
          <Image
            src={blog.image}
            alt={blog.imageAlt}
            fill
            priority
            sizes="(max-width: 700px) 90vw, 80vw"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-[42px] max-w-[680px] max-[700px]:mt-[30px]">
          {blog.sections.map((section) => (
            <section className="mb-[30px]" key={section.heading}>
              <h2 className="mb-[11px] font-[Georgia,Times_New_Roman,serif] text-[27px] font-normal tracking-[-.025em] max-[700px]:text-2xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className="mb-[14px] text-xs leading-[1.95] text-[#766c68]" key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <Link className="text-link mt-1.5 text-rose-dark" href="/blogs">
            <span aria-hidden="true">←</span> Back to all stories
          </Link>
        </div>
      </article>

      <section className="bg-cream px-[10.2%] pt-[68px] pb-[85px] max-[1000px]:px-[7%] max-[700px]:px-[7%] max-[700px]:pt-[50px] max-[700px]:pb-[62px]" aria-labelledby="related-stories-heading">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-[30px] gap-4">
          <div>
            <p className="eyebrow"><span /> Keep the sweetness going</p>
            <h2 className="m-0 font-[Georgia,Times_New_Roman,serif] text-[clamp(38px,4vw,52px)] font-normal tracking-[-.05em]" id="related-stories-heading">More little <em className="font-normal text-rose">stories.</em></h2>
          </div>
          <Link
            className="group/link text-link text-rose-dark inline-flex items-center gap-2 pb-1 border-b border-line w-fit transition-colors hover:text-ink"
            href="/blogs"
          >
            All stories
            <FiArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-[34px] max-[700px]:grid-cols-1 max-[700px]:gap-7">
          {relatedBlogs.map((item) => (
            <article key={item.slug}>
              <Link className="group relative block aspect-[1.48] w-full overflow-hidden bg-[#f1e8df] max-[700px]:aspect-[1.4]" href={`/blogs/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 700px) 90vw, 42vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.035]"
                />
              </Link>
              <div className="pt-4">
                <p className="m-0 flex flex-wrap gap-x-[14px] gap-y-2 text-[9px] tracking-[.04em] text-[#938680]">
                  <span className="text-rose-dark uppercase">{item.category}</span>
                  <span>{item.date}</span>
                </p>
                <h3 className="mt-[11px] mb-2 font-[Georgia,Times_New_Roman,serif] text-[25px] font-normal tracking-[-.025em]"><Link href={`/blogs/${item.slug}`}>{item.title}</Link></h3>
                <p className="m-0 text-[11px] leading-[1.8] text-[#827671]">{item.excerpt}</p>
                <Link className="mt-[13px] inline-flex items-center gap-2 text-[10px] text-rose-dark" href={`/blogs/${item.slug}`}>
                  Read the story
                  <FiArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}