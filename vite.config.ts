import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	resolve: {
		alias: { "@": path.resolve(__dirname, "src") },
	},
	plugins: [react(), tailwindcss()],
	optimizeDeps: {
		include: ["sql.js"],
		exclude: ["@duckdb/duckdb-wasm"],
	},
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
});
