import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ALL_COURSES } from "./data/courses"; // Adjust relative path as needed

// Simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://www.mentversity.com",
  });

  // Output sitemap.xml inside the public folder (served as /sitemap.xml)
  const writeStream = createWriteStream(
    path.resolve(__dirname, "./public/sitemap.xml")
  );
  sitemap.pipe(writeStream);

  // Static routes - update these as per your Next.js routes
  const staticRoutes = [
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

  // Dynamic course pages
  ALL_COURSES.forEach((course) => {
    sitemap.write({
      url: `/best-courses/${course.slug}`,
      changefreq: "monthly",
      priority: 1.0,
    });
  });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log("✅ Sitemap generated at public/sitemap.xml");
}

generateSitemap().catch((err) => {
  console.error("❌ Error generating sitemap:", err);
});
