/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.ibb.co",
          // ...
        },
        {
          protocol: "https",
          hostname: "https://www.pexels.com/",
          // ...
        },
      ],
    },
  };
