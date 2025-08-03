<!-- Fil: App.vue -->

<template>
  <!-- Din p5.js baggrunds-animation -->
  <div id="p5-background"></div>

  <!-- Fader-div til overgangen -->
  <div id="theme-fader" ref="themeFaderRef"></div>

  <!-- Din router-view -->
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path" />
  </router-view>
</template>


<script setup>
// OPDATERET: Importerer 'watch' i stedet for 'watchEffect'
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { isDarkMode } from './themeState.js';
import gsap from 'gsap';

// --- START: Opsætning af variabler (Uændret) ---
const themeFaderRef = ref(null);
const bgColor = ref({ r: 236, g: 236, b: 236 });
const particleColor = ref({ r: 3, g: 7, b: 101 });
let p5Instance = null;
// --- SLUT: Opsætning af variabler ---


// --- START: Den korrekte 'watch'-funktion ---
// Vi skifter til 'watch', som kun kører, når 'isDarkMode' ÆNDRER sig.
// Den kører IKKE ved den indledende sideindlæsning.
watch(isDarkMode, (isDark) => {
  // Find ud af, hvilken farve faderen skal have
  const faderColor = isDark ? '#ECECEC' : '#030765';

  // Animer faderen ind, skift tema, og animer faderen ud
  gsap.timeline()
    .to(themeFaderRef.value, { backgroundColor: faderColor, duration: 0 })
    .to(themeFaderRef.value, { autoAlpha: 1, duration: 0.3, ease: 'power2.in' })
    .add(() => {
      // Opdater farvevariablerne til det nye tema
      if (isDark) {
        bgColor.value = { r: 3, g: 7, b: 101 };
        particleColor.value = { r: 236, g: 236, b: 236 };
      } else {
        bgColor.value = { r: 236, g: 236, b: 236 };
        particleColor.value = { r: 3, g: 7, b: 101 };
      }
      
      // Nulstil p5-baggrunden øjeblikkeligt for at bevare trails
      if (p5Instance) {
        p5Instance.background(bgColor.value.r, bgColor.value.g, bgColor.value.b);
      }
    })
    .to(themeFaderRef.value, { autoAlpha: 0, duration: 0.35, ease: 'power2.out' });
});
// --- SLUT: Den korrekte 'watch'-funktion ---


// --- START: Din p5.js-logik (Uændret) ---
// --- START: Opdateret p5.js-logik ---
onMounted(() => {
  const sketch = (p) => {
    let particles = [];
    const numParticles = 130;
    
    // NYT: Variabler til at gemme den seneste størrelse
    let lastWidth;
    let lastHeight;

    class Particle {
      // ... Din Particle-klasse er uændret ...
      constructor() {
        this.pos = p.createVector(p.random(p.width), p.random(p.height));
        this.vel = p.createVector(0, 0);
        this.noiseOffset = p.random(10000);
        this.speed = 2;
        this.size = p.random(1, 3);
      }
      update() {
        const angle = p.noise(this.pos.x * 0.002, this.pos.y * 0.002, this.noiseOffset) * p.TWO_PI * 4;
        this.vel.x = p.cos(angle);
        this.vel.y = p.sin(angle);
        this.pos.add(window.p5.Vector.mult(this.vel, this.speed));
        this.wrapAround();
      }
      wrapAround() {
        if (this.pos.x < 0) this.pos.x = p.width;
        if (this.pos.x > p.width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = p.height;
        if (this.pos.y > p.height) this.pos.y = 0;
      }
      display() {
        p.noStroke();
        p.fill(particleColor.value.r, particleColor.value.g, particleColor.value.b);
        p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
      }
    }

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.parent('p5-background');
      canvas.style('z-index', '0');
      canvas.style('position', 'fixed');
      p.smooth(8);
      for (let i = 0; i < numParticles; i++) {
        particles[i] = new Particle();
      }
      p.background(bgColor.value.r, bgColor.value.g, bgColor.value.b);
      
      // NYT: Gem den indledende størrelse
      lastWidth = p.windowWidth;
      lastHeight = p.windowHeight;
    };

    p.draw = () => {
      p.noStroke();
      p.fill(bgColor.value.r, bgColor.value.g, bgColor.value.b, 7);
      p.rect(0, 0, p.width, p.height);
      for (let particle of particles) {
        particle.update();
        particle.display();
      }
    };

    // OPDATERET: Den "smarte" resize-funktion
    p.windowResized = () => {
      // Tjek, hvor meget størrelsen har ændret sig
      const heightChange = Math.abs(p.windowHeight - lastHeight);
      
      // En browsers adresselinje er typisk under 150 pixels høj.
      // Vi sætter en tærskel for at ignorere disse små ændringer.
      const threshold = 150;

      // Opdater kun canvas, hvis ændringen i højden er markant.
      if (heightChange > threshold) {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        
        // Opdater den sidst kendte størrelse
        lastWidth = p.windowWidth;
        lastHeight = p.windowHeight;
        
        // Gentegn baggrunden med det samme for at undgå flimmer
        p.background(bgColor.value.r, bgColor.value.g, bgColor.value.b);
      }
    };
  };

  if (window.p5) {
    p5Instance = new window.p5(sketch);
  } else {
    console.error('p5.js library not found on window object.');
  }
});
// --- SLUT: Opdateret p5.js-logik ---

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
});
// --- SLUT: Din p5.js-logik ---
</script>


<style>
/* Din eksisterende CSS er uændret */
html, body {
  margin: 0;
  padding: 0;
  background-color: transparent;
  overflow-x: hidden;
  /* Forhindrer "pull-to-refresh" på hele siden */
  overscroll-behavior-y: contain;
}

#p5-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  touch-action: none;
}

/* DEN NYE CSS FOR FADEREN */
#theme-fader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #030765; /* Starter med en default farve */
  z-index: 9999; /* Skal være over ALT andet */
  pointer-events: none; /* Skal ikke kunne klikkes på */
  opacity: 0; /* Starter usynlig */
}





@media (max-width: 420px) {


  html, body {

    overscroll-behavior-y: contain;
  }
  


}
</style>