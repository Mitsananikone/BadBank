/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
};