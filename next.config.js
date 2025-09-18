/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Aplica a todas las rutas
        headers: [
          // Política de Seguridad de Contenidos (CSP)
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src * data: blob:; object-src 'none'; frame-ancestors 'none'; base-uri 'self';",
          },
          // Trusted Types
          {
            key: "Content-Security-Policy",
            value: "require-trusted-types-for 'script';",
          },
          // Protección contra clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // COOP + COEP
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          // HSTS con preload
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Política Referrer más estricta
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Política de Permisos
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Protección contra sniffing de contenido
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
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
