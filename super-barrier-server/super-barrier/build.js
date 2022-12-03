const { build } = require("esbuild");

build({
  define: { "process.env.NODE_ENV": process.env.NODE_ENV },
  target: "es2015",
  platform: "browser",
  entryPoints: ["src/index.tsx"],
  outdir: "dist",
  bundle: true,
  minify: !process.env.NODE_ENV,
  sourcemap: process.env.NODE_ENV,
}).catch((reason) => {
  console.log(reason);
  process.exit(1);
});
