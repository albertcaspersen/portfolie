<script setup>
import { ref, onMounted, watch } from 'vue';
import { isDarkMode } from '../themeState.js';
import gsap from 'gsap';

// --- Tilstand & Refs ---
const isMenuOpen = ref(false);
const navContainerRef = ref(null);
const navLinksRef = ref([]);
const linkyRef = ref(null); // <-- 1. Opret en ny ref til linky-sektionen

// --- GSAP Tidslinje & Tilstand ---
let timeline = null;
let isMobileView = false;

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

onMounted(() => {
  function setupMobileAnimation() {
    if (timeline) timeline.kill();
    
    timeline = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.set(navContainerRef.value, { display: 'none' });
      }
    });

    // Saml alle elementer, der skal animeres
    const elementsToAnimate = [...navLinksRef.value, linkyRef.value]; // <-- 2. Kombiner nav-links og linky

    timeline
      .to(navContainerRef.value, {
        clipPath: 'circle(150% at top right)',
        duration: 0.6,
        ease: 'power3.inOut'
      })
      // Animer både navLinks og linkyRef sammen
      .from(elementsToAnimate, { // <-- 3. Brug den kombinerede liste her
        opacity: 0,
        y: 30,
        duration: 0.4,
        stagger: 0.1, // Stagger vil virke på tværs af alle elementer i listen
        ease: 'power2.out'
      }, "-=0.4");
  }

  gsap.matchMedia().add("(max-width: 600px)", () => {
    isMobileView = true;
    setupMobileAnimation();

    return () => {
      isMobileView = false;
      isMenuOpen.value = false; 
      gsap.set(navContainerRef.value, { clearProps: 'all' });
      gsap.set(navLinksRef.value, { clearProps: 'all' });
      gsap.set(linkyRef.value, { clearProps: 'all' }); // Sørg for at rydde op her også
    };
  });
});

watch(isMenuOpen, (isOpen) => {
  if (isMobileView && timeline) {
    if (isOpen) {
      gsap.set(navContainerRef.value, { display: 'flex' });
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
      
      <!-- Tilføj ref="linkyRef" til h2-elementet -->
      <h2 class="linky" ref="linkyRef">
        <span style="font-weight: 700;">Mail</span><br>
         <a href="mailto:albertcaspersen@hotmail.com" style="text-decoration: none; color: #0300c7;">albertcaspersen@hotmail.com</a><br><br>
  
        <span style="font-weight: 700;">Socials</span><br>
        <a href="https://www.instagram.com/albert_caspersen/" style="text-decoration: none; color: #0300c7;">Instagram</a><br>
        <a href="https://www.facebook.com/albert.caspersen?locale=da_DK" style="text-decoration: none; color: #0300c7;">Facebook</a><br><br>
  
        <span style="font-weight: 700;">Phone</span><br>
        50557144
      </h2>
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
.nav-link { text-decoration: none; color: #0300c7; font-family: 'Panchang', 'Arial', sans-serif; font-size: 3.5rem; font-weight: 600; margin: 1.5rem 0; position: relative; top: 10vh; }
.router-link-active { text-decoration: underline; }
.grid-navbar-nav.dark-mode .nav-link { color: #FFFFFF; }

/* --- GSAP-styret Nav Container --- */
.nav-links-container {
  display: none;
  flex-direction: column;
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

.linky {
  font-size: 0.9rem;
  color: #0300c7;
  font-weight: 100;
  position: absolute;
  bottom: 20vh;
  left: 8.7vw;
}

/* --- DESKTOP STYLES --- */
@media (min-width: 601px) {
  .burger-menu {
    display: none;

  }
  .grid-navbar-nav.dark-mode .nav-links-container {
    background-color: transparent;
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
    top: 0vh;
    right: -3.2vw;
  }
}
</style>