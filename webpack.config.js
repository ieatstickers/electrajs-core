
const baseConfig = {
  plugins: [],
  mode:    process.env.ENV === "dev" ? "development" : "production",
  // Entry
  entry: {
    index: "./index.ts"
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".json" ]
  },
  // Loaders
  module: {
    rules: [
      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        use:  [ { loader: "ts-loader" } ]
      }
    ]
  }
};

module.exports = [
  // commonjs
  {
    ...baseConfig,
    // Output
    output: {
      filename: "[name].min.cjs",
      path: `${__dirname}/dist`,
      library:  {
        type: "commonjs2"
      }
    }
  },
  // esm
  {
    ...baseConfig,
    // Output
    output:  {
      filename: "[name].min.mjs",
      path: `${__dirname}/dist`,
      library:      {
        type: "module"
      }
    },
    experiments: {
      outputModule: true
    }
  }
];
