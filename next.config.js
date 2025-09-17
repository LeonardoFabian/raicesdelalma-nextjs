/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "www.purplebutterflybouquets.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      resourceQuery: /raw/, // solo aplica a imports con ?raw
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
