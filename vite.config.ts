import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "node:path";
export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $: path.resolve("./src"),
      $components: path.resolve("./src/components"),
      $stores: path.resolve("./src/lib/stores"),
      $static: path.resolve("./static"),
      $services: path.resolve("./src/lib/services/services"),
      //   $lib: path.resolve("./src/libs"),
      //   "$libs/*": path.resolve("./src/libs/*"),
    },
  },
});
