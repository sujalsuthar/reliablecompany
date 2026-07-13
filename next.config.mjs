/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Permitted-Cross-Domain-Policies',
    value: 'none',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
      "connect-src 'self'",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join('; '),
  },
]

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admincms',
        destination: '/admin',
        permanent: true,
      },
      {
        source: '/admincms/:path*',
        destination: '/admin/:path*',
        permanent: true,
      },
      {
        source: '/services/front-end-engineering-feed',
        destination: '/services/web-application-penetration-testing',
        permanent: true,
      },
      {
        source: '/services/network-infrastructure-vapt',
        destination: '/services/network-penetration-testing',
        permanent: true,
      },
      {
        source: '/services/external-internal-vapt',
        destination: '/services/network-penetration-testing',
        permanent: true,
      },
      {
        source: '/services/security-assessment-risk-analysis',
        destination: '/services/gap-assessment',
        permanent: true,
      },
      {
        source: '/services/iso-27001-audits',
        destination: '/services/isms-audits',
        permanent: true,
      },
      {
        source: '/services/project-management-consultancy',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/digital-security-industrial',
        destination: '/services/ot-security-testing',
        permanent: true,
      },
      {
        source: '/dark-web-monitoring',
        destination: '/services/dark-web-monitoring',
        permanent: true,
      },
      {
        source: '/projects/industrial-cyber-security',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
