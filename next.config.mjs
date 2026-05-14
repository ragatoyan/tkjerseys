/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photo.yupoo.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
