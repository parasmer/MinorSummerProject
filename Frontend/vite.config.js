import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
//  server: {
//     proxy: {
//       // Matches any request starting with /api
//       '/api': {
//         target: 'http://localhost:5000', // Point to the backend server root
//         changeOrigin: true,             // Needed for virtual hosted sites
//         secure: false,                  // If you are using https locally with invalid certs
//       }
//     }
//   }
})
