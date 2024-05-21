/** 
 * @type {import('tailwindcss').Config} 
 * Specifies that this file is a Tailwind CSS configuration file and provides type information for TypeScript.
 */

export default {
  // Specifies the files where Tailwind CSS should look for classes to generate. 
  // Here, it includes HTML files and JavaScript/TypeScript files in the src directory.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Specifies custom theme configurations, extending the default Tailwind CSS theme.
  theme: {
    extend: {
      colors: { // Extends the colors section of the default theme.
        'primary': '#8200ed', // Defines a custom primary color.
        'secondary': '#6e18b4', // Defines a custom secondary color.
      },
    },
  },
  
  // Specifies any additional plugins to use with Tailwind CSS.
  plugins: [],
}
