import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/icons-material"], // Força o Vite a incluir os ícones no bundle
  },
  build: {
    rollupOptions: {
      external: [], // Remove qualquer externalização acidental
    },
  },
});
