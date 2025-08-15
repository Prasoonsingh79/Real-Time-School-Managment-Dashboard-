// import { hostname } from 'os';

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// images:{
//     remotePatterns:[{
//         hostname:"images.pexels.com",
//         protocol:"https",
//     }]
// }
// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
