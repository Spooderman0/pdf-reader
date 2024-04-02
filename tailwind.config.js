/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // esto incluye todos los archivos de React en tu directorio src
  ],
  theme: {
    extend: {
      // Aquí puedes extender tu tema, por ejemplo, añadiendo colores personalizados o fuentes
    },
  },
  plugins: [
    // Si necesitas algún plugin de Tailwind CSS, los añadirías aquí
  ],
};
