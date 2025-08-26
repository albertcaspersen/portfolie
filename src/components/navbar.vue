<!-- Fil: Navbar.vue -->

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { isDarkMode } from '../themeState.js';
import gsap from 'gsap';

// --- Tilstand & Refs ---
const isMenuOpen = ref(false);
const navContainerRef = ref(null);
const navLinksRef = ref([]);
const linkyRef = ref(null);

// --- GSAP Tidslinje ---
let timeline = null;

// Funktion til at skifte menuen
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Kør, når komponenten er monteret
onMounted(() => {
  timeline = gsap.timeline({
    paused: true,
    onReverseComplete: () => {
      // Skjuler containeren når animationen er færdig med at køre baglæns
      gsap.set(navContainerRef.value, { display: 'none' });
    }
  });

  const linkyItems = gsap.utils.toArray(linkyRef.value.children);
  const elementsToAnimate = [...navLinksRef.value, ...linkyItems];

  timeline
    .to(navContainerRef.value, {
      clipPath: 'circle(150% at top right)',
      duration: 0.6,
      ease: 'power3.inOut'
    })
    .from(elementsToAnimate, {
      opacity: 0,
      y: 70,
      duration: 0.4,
      stagger: 0.15,
      ease: 'power2.out'
    }, "-=0.1");
});

// Ryd op når komponenten fjernes
onUnmounted(() => {
  if (timeline) {
    timeline.kill();
  }
});

// Reagerer på ændringer i isMenuOpen
watch(isMenuOpen, (isOpen) => {
  if (timeline) {
    if (isOpen) {
      // Check om vi er på desktop eller mobil
      const isDesktop = window.innerWidth > 600;
      if (isDesktop) {
        gsap.set(navContainerRef.value, { display: 'grid' });
      } else {
        gsap.set(navContainerRef.value, { display: 'flex' });
      }
      timeline.play();
    } else {
      timeline.reverse();
    }
  }
});
</script>

<template>
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
      
      <div class="linky" ref="linkyRef">
        <div><a href="mailto:albertcaspersen@hotmail.com">Mail</a></div>
        <div class="spacer"></div>
        <div><a href="https://www.instagram.com/albert_caspersen/">Instagram</a></div>
        <div><a href="https://www.linkedin.com/in/albert-valdemar-caspersen-a9a433331/">Linkedin</a></div>
        <div><a href="https://www.facebook.com/albert.caspersen?locale=da_DK">Facebook</a></div>
        <div class="spacer"></div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* --- GENERELLE STYLES (MOBIL-FIRST) --- */
.grid-navbar-nav {
  grid-column: 11 / 13;
  grid-row: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  top: -1vh;
}

.burger-menu {
  grid-column: 11 / 13;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.0rem;
  align-items: center;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  background-color: transparent;
  right: 0.9rem;
  position: absolute;
}

.line {
  width: 2rem;
  height: 0.25rem;
  background-color: #0300c7;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.grid-navbar-nav.dark-mode .line {
  background-color: #FFFFFF;
}

.grid-navbar-nav.menu-open .line1 {
  transform: rotate(45deg);
}
.grid-navbar-nav.menu-open .line2 {
  opacity: 0;
  transform: translateX(20px);
}
.grid-navbar-nav.menu-open .line3 {
  transform: rotate(-45deg);
}

/* --- Links Styling (Mobil) --- */
.nav-link {
  text-decoration: none;
  color: #0300c7;
  font-family: 'Panchang', 'Arial', sans-serif;
  font-size: 3.5rem;
  font-weight: 600;
  margin: 1.5rem 0; /* Lille margin mellem linkene */
  padding: 0 0 0 0.7rem; /* Kun left padding */
  line-height: 1; /* Normal line-height */
  position: relative;
  top: -17vh;
}

.router-link-active {
  text-decoration: underline;
}

.grid-navbar-nav.dark-mode .nav-link {
  color: #FFFFFF;
}

/* --- GSAP-styret Nav Container (Mobil) --- */
.nav-links-container {
  display: none; /* Skjult som standard, styres af GSAP */
  flex-direction: column;
  align-items: flex-start;
  justify-content: center; /* Centrerer indholdet vertikalt */
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

/* --- Styling for Linky-sektionen (Mobil) --- */
.linky {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  font-weight: 100;
  position: absolute;
  bottom: 10vh;
  left: 0.9rem;
  width: 100%;
}

.linky div {
  line-height: 1.9;
}
.linky a {
  color: #0300c7;
  text-decoration: none;
}
.linky .spacer {
  height: 1.5rem;
}
.grid-navbar-nav.dark-mode .linky,
.grid-navbar-nav.dark-mode .linky a {
  color: #FFFFFF;
}

/* --- DESKTOP JUSTERINGER --- */
@media (min-width: 601px) {



  .grid-navbar-nav {
    grid-column: 11 / 13;
    grid-row: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    top: -0vh;
  }
  
  .burger-menu {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 4.9rem;
    align-items: center;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    background-color: transparent;
    right: 3.98vw;
    position: absolute;
  }




  /* Anvend dit ønskede grid på containeren */
  .nav-links-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(4, auto); /* Ændret til 4 rækker for bedre kontrol */
    gap: 0; /* Fjernet gap mellem grid-elementer */
    position: fixed;
    padding: 5vh 0; /* Tilføjet top/bottom padding */
    margin: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(236, 236, 236);
    align-items: start;
    align-content: center; /* Centrerer grid-indholdet vertikalt */
    box-sizing: border-box;
  }

  /* Placer hvert nav-link på en ny række i grid'et */
  .nav-link {
    grid-column: 3 / 13;
    font-size: 6rem;
    margin: 0;
    padding: 0.2rem 0; /* Lille padding for at give minimal afstand */
    top: 0;
    align-self: start;
    line-height: 1.9; /* Justeret line-height for tættere spacing */
  }

  /* Placer linky-sektionen i bunden */
  .linky {
    grid-column: 3 / 13;
    grid-row: 4; /* Sidste række */
    font-size: 1.2rem;
    align-self: end;
    padding-bottom: 5vh;
    position: static; /* Ændret fra absolute til static */
    
  }
}
</style>