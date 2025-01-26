import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire.default(),
    tailwindcss(),
  ],
<<<<<<< HEAD

  sever:{
    host:'0.0.0.0',
    port:'5500',
  }
=======
>>>>>>> 965a4a31333de6cf073d573e4004ca080df12acd
})


