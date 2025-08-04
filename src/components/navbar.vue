<!-- Fil: Navbar.vue -->

<script setup>
import { ref, onMounted, watch } from 'vue';
import { isDarkMode } from '../themeState.js';
import gsap from 'gsap';

// --- Tilstand & Refs ---
const isMenuOpen = ref(false);
const navContainerRef = ref(null);
const navLinksRef = ref([]);

// --- GSAP Tidslinje & Tilstand ---
let timeline = null;
// En simpel variabel til at vide, om vi er på mobil.
let isMobileView = false;

// Altid-aktiv funktion til at skifte menuen
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Kør, når komponenten er monteret
onMounted(() => {
  // Funktion til at bygge mobil-animationen
  function setupMobileAnimation() {
    // Sørg for, at gamle tidslinjer er dræbt
    if (timeline) timeline.kill();
    
    // Opret en ny, pauset tidslinje
    timeline = gsap.timeline({
      paused: true,
      // Når menuen er helt lukket, skjules containeren rent
      onReverseComplete: () => {
        gsap.set(navContainerRef.value, { display: 'none' });
      }
    });

    // Definer animationens trin
    timeline
      .to(navContainerRef.value, {
        clipPath: 'circle(150% at top right)',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .from(navLinksRef.value, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, "-=0.4");
  }

  // Brug matchMedia KUN til at rydde op og sætte tilstand
  gsap.matchMedia().add("(max-width: 600px)", () => {
    // VI ER PÅ MOBIL
    isMobileView = true;
    setupMobileAnimation(); // Byg animationen

    // Cleanup-funktion: Køres når vi går til desktop
    return () => {
      isMobileView = false;
      // Nulstil menuen, hvis den var åben
      isMenuOpen.value = false; 
      gsap.set(navContainerRef.value, { clearProps: 'all' });
      gsap.set(navLinksRef.value, { clearProps: 'all' });
    };
  });
});

// WATCH ER NU UDENFOR MATCHMEDIA - DEN KØRER ALTID
// Dette er den afgørende rettelse.
watch(isMenuOpen, (isOpen) => {
  // Reager kun, hvis vi er på mobil og tidslinjen eksisterer
  if (isMobileView && timeline) {
    if (isOpen) {
      // Gør containeren synlig, LIGE FØR animationen starter
      gsap.set(navContainerRef.value, { display: 'flex' });
      timeline.play();
    } else {
      timeline.reverse();
    }
  }
});

</script>

<template>
  <!-- Template er uændret og korrekt -->
  <nav class="grid-navbar-nav" :class="{ 'dark-mode': isDarkMode, 'menu-open': isMenuOpen }">
    <button class="burger-menu" @click="toggleMenu" :aria-expanded="isMenuOpen" aria-label="Toggle navigation">
      <div class="line line1"></div>
      <div class="line line2"></div>
      <div class="line line3"></div>
    </button>
    <div class="nav-links-container" ref="navContainerRef">
      <router-link
        v-for="link in [{to: '/about', text: 'About'}, {to: '/projects', text: 'Projects'}, {to: '/contact', text: 'Contact'}]"
        :key="link.to" :to="link.to" class="nav-link"
        :ref="el => { if (el) navLinksRef.push(el.$el) }"
        @click="isMenuOpen = false">
        {{ link.text }}
      </router-link>
    </div>
  </nav>
</template>

<style scoped>
/* Din CSS-kode er uændret og kan forblive præcis som i det forrige svar.
   Den simplificerede @media-blok uden '!important' vil nu fungere korrekt.
*/

/* --- Generel & Burger Styling --- */
.grid-navbar-nav { grid-column: 11 / 13; grid-row: 1; display: flex; justify-content: flex-end; align-items: center; position: relative; top: -0vh;  }
.burger-menu { display: flex; flex-direction: column; justify-content: space-around; width: 3rem; height: 2rem; background: transparent; border: none; cursor: pointer; padding: 0; z-index: 1001; }
.line { width: 2rem; height: 0.25rem; background-color: #0300c7; border-radius: 10px; transition: all 0.3s linear; position: relative; transform-origin: 1px; top: -1vh; right: -0.6vw;}
.grid-navbar-nav.dark-mode .line { background-color: #FFFFFF; }
.grid-navbar-nav.menu-open .line1 { transform: rotate(45deg); }
.grid-navbar-nav.menu-open .line2 { opacity: 0; transform: translateX(20px); }
.grid-navbar-nav.menu-open .line3 { transform: rotate(-45deg); } 

/* --- Links Styling --- */
.nav-link { text-decoration: none; color: #0300c7; font-family: 'Panchang', 'Arial', sans-serif; font-size: 3.5rem; font-weight: 600; margin: 1.5rem 0; top: 10vh; }
.router-link-active { text-decoration: underline; }
.grid-navbar-nav.dark-mode .nav-link { color: #FFFFFF; }

/* --- GSAP-styret Nav Container --- */
.nav-links-container {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  text-align: left;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  background-color: rgb(236, 236, 236);
  clip-path: circle(0% at top right);
  
}

.grid-navbar-nav.dark-mode .nav-links-container {
  background-color: #0300c7;
}

/* --- DESKTOP STYLES --- */
@media (min-width: 601px) {
  .burger-menu {
    display: none;

  }
  
  .nav-links-container {
    display: flex; /* Vises som standard på desktop */
    flex-direction: row;
    position: static;
    height: auto;
    width: auto;
    background-color: transparent;
    clip-path: none;
  }

  .nav-link {
    font-size: 1.2rem;
    margin: 0;
    margin-right: 5em;
  }
}
</style>