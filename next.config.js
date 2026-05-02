/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Pages Router doesn't fully tree-shake server-only imports (fs, path) from client
  // bundles when they appear in the same file as getStaticProps. This polyfill is necessary.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, path: false }
    }
    return config
  },
}
