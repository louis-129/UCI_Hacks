import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire.default(),
    tailwindcss(),
  ],

  sever:{
    host:'0.0.0.0',
    port:'5500',
  }
})


