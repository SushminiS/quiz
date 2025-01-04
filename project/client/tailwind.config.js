/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,js,jsx}'
  ],
  darkMode: ['class', '.ns-dark'], // Keep this if using NativeScript's dark mode class
  theme: {
    extend: {}
  },
  plugins: [
    // Add plugins here if needed
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false // Set to true if you're not using NativeScript or need resets
  }
};
