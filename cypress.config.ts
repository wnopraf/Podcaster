import { defineConfig } from "cypress";

//import viteConf from "./vite.config";

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // viteConfig: viteConf,
    },
  },
});
