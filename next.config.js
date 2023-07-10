/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.(mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "/_next/static/assets/sounds/",
              outputPath: "static/assets/sounds/",
            },
          },
        ],
      },
      {
        test: /\.(wav)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "/_next/static/assets/sounds/",
              outputPath: "static/assets/sounds/",
            },
          },
        ],
      }
    );

    return config;
  },
};

module.exports = nextConfig;
