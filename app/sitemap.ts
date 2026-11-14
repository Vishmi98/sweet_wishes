import type { MetadataRoute } from "next";

import { blogs } from "@/constants/blogs";
import { cakes } from "@/constants/data";
import { absoluteUrl, toIsoDate } from "@/lib/site";

// /reviews is left out on purpose: it shows sample reviews and is marked noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestBlogDate = blogs
    .map((blog) => toIsoDate(blog.date))
    .filter((date): date is string => Boolean(date))
    .sort()
    .at(-1);

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/shop"), changeFrequency: "weekly", priority: 0.9 },
    ...cakes.map((cake) => ({
      url: absoluteUrl(`/shop/${cake.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/blogs"), lastModified: latestBlogDate, changeFrequency: "weekly", priority: 0.6 },
    ...blogs.map((blog) => ({
      url: absoluteUrl(`/blogs/${blog.slug}`),
      lastModified: toIsoDate(blog.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
