// Fil: src/themeState.js

import { ref } from 'vue';

// Vi opretter en reaktiv variabel, der holder styr på, om vi er i mørk tilstand.
// 'false' er standard (lys tilstand).
export const isDarkMode = ref(false);