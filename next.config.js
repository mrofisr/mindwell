const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  future: { webpack5: true },
});
