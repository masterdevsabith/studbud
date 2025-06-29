import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
        port: "",
      },
    ],
  },
  allowedDevOrigins: ["127.0.0.1.nip.io", "*.127.0.0.1.nip.io"],
};

export default nextConfig;
