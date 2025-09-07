import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // โหลดค่าจาก .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80, // run on port 80
    host: true, // allow external access (0.0.0.0)
    proxy: {
       '/api': {
        target: process.env.VITE_API_URL,
      }
    },
  },
});
