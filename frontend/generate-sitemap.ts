import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch"; // make sure node-fetch v3
import { ALL_COURSES } from "./data/courses"; // Update path if needed

// --- Types ---
interface Course {
  slug: string;
  [key: string]: any;
}

interface Page {
  slug: string;
  status: "published" | "draft" | string;
  [key: string]: any;
}

interface PagesResponse {
  data: {
    pages: Page[];
  };
}

// Simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backend API endpoint to get all pages
const API_PAGES_ENDPOINT = "http://localhost:5000/api/pages"; // change to your backend URL

async function generateSitemap() {
  try {
    const sitemap = new SitemapStream({
      hostname: "https://www.mentversity.com",
    });

    // Write stream to public/sitemap.xml
    const writeStream = createWriteStream(path.resolve(__dirname, "./public/sitemap.xml"));
    sitemap.pipe(writeStream);

    // --- 1. Static routes ---
    const staticRoutes: string[] = [
      "/",
      "/best-courses",
      "/contact",
      "/connect-with-us",
      "/privacy-policy",
      "/signup",
      "/login",
    ];
    staticRoutes.forEach((route) => {
      sitemap.write({ url: route, changefreq: "monthly", priority: 0.8 });
    });

    // --- 2. Courses ---
    ALL_COURSES.forEach((course: Course) => {
      sitemap.write({
        url: `/best-courses/${course.slug}`,
        changefreq: "monthly",
        priority: 1.0,
      });
    });

    // --- 3. Dynamic pages from backend ---
    const res = await fetch(API_PAGES_ENDPOINT);
    if (res.ok) {
      const data: PagesResponse = (await res.json()) as PagesResponse;
      const pages: Page[] = data.data.pages || [];
      pages.forEach((page) => {
        if (page.status === "published") {
          sitemap.write({
            url: `/${page.slug}`,
            changefreq: "monthly",
            priority: 0.9,
          });
        }
      });
    } else {
      console.warn("⚠ Failed to fetch pages from backend:", res.status);
    }

    sitemap.end();
    await streamToPromise(sitemap);
    console.log("✅ Sitemap generated at public/sitemap.xml");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
}

// Run
generateSitemap();
