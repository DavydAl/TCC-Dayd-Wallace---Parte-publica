const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  module: {
    rules: [
      // Regras de configuração para transpilação de TypeScript, carregamento de arquivos, etc.
    ],
  },
};
