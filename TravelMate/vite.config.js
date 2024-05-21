import { defineConfig } from 'vite'; // Importing the defineConfig function from Vite
import react from '@vitejs/plugin-react'; // Importing the Vite plugin for React

// Exporting the Vite configuration using defineConfig
export default defineConfig({
  // Specifies the plugins to use with Vite
  plugins: [react()], // Using the Vite plugin for React
});
