/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Remove static export to allow API routes
  // output: 'export',
  trailingSlash: true,
  
  images: {
    // Keep image optimization disabled for better Netlify compatibility
    unoptimized: true,
    
    // Define image domains if you're loading external images
    // domains: ['example.com'],
    
    // Define allowed formats
    formats: ['image/webp', 'image/avif'],
    
    // Add device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Add image sizes for different use cases
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["react-component"] },
    });
    return cfg;
  },
};

module.exports = nextConfig;
