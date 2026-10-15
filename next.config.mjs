/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF primeiro (menor), WebP como alternativa; o navegador escolhe pelo header Accept.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
