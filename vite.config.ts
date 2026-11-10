import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths relative so the build works on GitHub Pages or any sub-path.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
