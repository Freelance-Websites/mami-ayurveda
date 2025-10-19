/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mamiayurveda.com.ar',
  generateRobotsTxt: true, // (optional)
  // generateIndexSitemap: false, // (optional)
  // ...other options
  exclude: ['/admin/*'], // Exclude admin paths from sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      // Add any additional sitemaps here if needed
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
}