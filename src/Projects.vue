<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/navbar.vue'
import Designstud from './components/Designstud.vue'
import ProjectScene from './components/ProjectScene.vue'
import gsap from 'gsap'

// --- DATA OG GRUNDLÆGGENDE FUNKTIONER ---
const projects = ref([
  { 
    id: 0, 
    title: "Projection mapping...", 
    description: "The task...", 
    longDescription: "Her kan du skrive en meget længere og mere detaljeret beskrivelse af dit projection mapping projekt. Forklar om konceptet, de tekniske udfordringer og resultatet.",
    media: new URL('./assets/sliderContent/lola.mp4', import.meta.url).href, 
    mediaType: 'video' 
  },
  { 
    id: 1, 
    title: "Ocean storm animation...", 
    description: "I actually followed...", 
    longDescription: "Uddyb hvordan du fulgte en tutorial for at skabe denne storm-animation. Hvilken software brugte du? Hvad lærte du undervejs? Du kan også indsætte flere billeder af processen her.",
    media: new URL('./assets/sliderContent/Minfilm2.mp4', import.meta.url).href, 
    mediaType: 'video' 
  },
  { 
    id: 2, 
    title: "Interactive horror story...", 
    description: "The task for this project...", 
    longDescription: "Fortæl mere om denne interaktive gyserhistorie. Hvad var formålet med projektet? Hvordan blev interaktiviteten implementeret, og hvilken effekt havde det på brugeroplevelsen?",
    media: new URL('./assets/sliderContent/skov.mp4', import.meta.url).href, 
    mediaType: 'video' 
  },
  { 
    id: 3, 
    title: "'While in battle...'", 
    description: "This was part of an exam...", 
    longDescription: "Dette var en del af en eksamen. Beskriv opgaven i detaljer, dine overvejelser bag designet og hvordan du løste opgaven for at opnå din karakter.",
    media: new URL('./assets/sliderContent/whileInBattle.jpg', import.meta.url).href, 
    mediaType: 'image' 
  },
  { 
    id: 4, 
    title: "Having some fun with perlin noise...", 
    description: "I made this cool...", 
    longDescription: "Perlin noise er et fascinerende værktøj. Forklar hvad det er, og hvordan du brugte det i dette specifikke projekt for at generere organiske mønstre eller animationer.",
    media: new URL('./assets/sliderContent/sphereM.mp4', import.meta.url).href, 
    mediaType: 'video' 
  },
  { 
    id: 5, 
    title: "Exam project about oxygen depletion for Videnskab.dk", 
    description: "I made this cool...", 
    longDescription: "Perlin noise er et fascinerende værktøj. Forklar hvad det er, og hvordan du brugte det i dette specifikke projekt for at generere organiske mønstre eller animationer.",
    media: new URL('./assets/sliderContent/HavetUnderPres.mp4', import.meta.url).href, 
    mediaType: 'video' 
  }
])
const activeProject = ref(projects.value[0])
const selectedProject = ref(null)

function updateActiveProject(project) {
  if (!selectedProject.value) { activeProject.value = project }
}

function selectProject(project) {
  if (selectedProject.value?.id === project.id) {
    selectedProject.value = null
  } else {
    selectedProject.value = project
  }
}

onMounted(() => { document.body.style.overflow = 'hidden'; });
onUnmounted(() => { document.body.style.overflow = 'auto'; });

// --- LYDSTYRING (NY) ---
const isMuted = ref(true) // Global state for lyd. Starter mutet.
function toggleMute() {
  isMuted.value = !isMuted.value
}

// --- GSAP NOISE TRANSITION ---
const onEnter = (el, done) => {
  const filter = document.querySelector("#noise-filter feTurbulence");
  const displacement = document.querySelector("#noise-filter feDisplacementMap");
  const tl = gsap.timeline({ onComplete: done });

  tl
    .set(el, { autoAlpha: 0, filter: 'url(#noise-filter)' })
    .set(filter, { attr: { baseFrequency: '0.2 0.2' } })
    .set(displacement, { attr: { scale: 150 } })
    .to(el, { autoAlpha: 1, duration: 0.4 }, 0.1)
    .to(filter, { attr: { baseFrequency: '0.0 0.0' }, duration: 1.2, ease: 'power2.out' }, 0)
    .to(displacement, { attr: { scale: 0 }, duration: 1.2, ease: 'power2.out' }, 0)
    .from(el.querySelectorAll('h2, p, button'), { autoAlpha: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, "-=0.8");
};

const onLeave = (el, done) => {
  const filter = document.querySelector("#noise-filter feTurbulence");
  const displacement = document.querySelector("#noise-filter feDisplacementMap");
  const tl = gsap.timeline({ onComplete: done });

  tl
    .set(el, { filter: 'url(#noise-filter)' })
    .to(filter, { attr: { baseFrequency: '0.3 0.3' }, duration: 0.8, ease: 'power2.in' }, 0)
    .to(displacement, { attr: { scale: 200 }, duration: 0.8, ease: 'power2.in' }, 0)
    .to(el, { autoAlpha: 0, duration: 0.8 }, 0);
};

</script>

<template>
  <div>
    <!-- SVG-FILTER TIL ANIMATION -->
    <svg style="position:absolute; width:0; height:0;">
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.0 0.0" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" />
      </filter>
    </svg>

    <!-- UI ELEMENTER -->
    <div class="grid-container">
      <Navbar />
      <Designstud />
    </div>

    <div class="page-container">
      <!-- LYD-KNAP (NY) -->
      <button @click="toggleMute" class="audio-toggle-button">
        <!-- Ikon for når lyden er FRA (muted) -->
        <svg v-if="isMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.49 15.2 21 13.66 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.34-.3 2.57-.92 3.61-1.75l2.08 2.08L21 20.73l-9-9L4.27 3z"/>
        </svg>
        <!-- Ikon for når lyden er TIL -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      </button>

      <div class="scene-container">
        <Suspense>
          <ProjectScene 
            :projects="projects" 
            :is-globally-muted="isMuted"
            @project-focus="updateActiveProject"
            @project-click="selectProject" 
          />
          <template #fallback>
            <div class="loading-fallback"><p>Loading 3D Experience...</p></div>
          </template>
        </Suspense>
      </div>

      <Transition name="fade">
        <div v-if="!selectedProject" class="text-overlay">
          <h1 class="projektTekst">{{ activeProject.title }}</h1>
          <p class="tekstBeskrivelse">{{ activeProject.description }}</p>
        </div>
      </Transition>
    </div>
    
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-if="selectedProject" class="project-details">
        <div class="details-content">
          <h2>{{ selectedProject.title }}</h2>
          <p>{{ selectedProject.longDescription }}</p>
          <p>Her kan du tilføje endnu mere indhold.</p>
          <button @click="selectedProject = null">Tilbage til oversigten</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* LYD-KNAP STYLING (NY) */
.audio-toggle-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 20;
  background-color: rgba(240, 240, 240, 0.6);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  padding: 0;
}
.audio-toggle-button:hover {
  transform: scale(1.1);
  background-color: rgba(240, 240, 240, 0.8);
}
.audio-toggle-button svg {
  width: 24px; /* Justeret for bedre pasform */
  height: 24px; /* Justeret for bedre pasform */
  color: #0300c7;
}

/* STYLING TIL DETALJE-SIDE */
.project-details {
  background-color: #ECECEC;
  color: #1a1a1a;
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  overflow-y: auto; z-index: 5;
  padding: 80px 20px 20px 20px;
  font-family: panchang;
}
.details-content { max-width: 80vw; margin: 0 auto; }
.details-content h2 { font-size: clamp(2rem, 5vw, 3.5rem); color: #0300c7; margin-bottom: 2rem; }
.details-content p { font-size: 1.1rem; line-height: 1.8; margin-bottom: 1.5rem; }
.details-content button {
  display: inline-block; margin-top: 20px; padding: 12px 25px;
  background-color: #0300c7; color: white; border: none; border-radius: 8px;
  cursor: pointer; font-size: 1rem; font-weight: 500;
  transition: background-color 0.3s ease; font-family: panchang;
}
.details-content button:hover { background-color: #02009a; }

/* UÆNDRET CSS */
.grid-container {
    display: grid; grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto; gap: 20px; padding: 0; margin: 0;
    width: 100%; position: fixed; top: 0; left: 0;
    background: transparent; z-index: 10;
}
.page-container {
  width: 100vw; height: 100vh; margin: 0; padding: 0;
  position: relative; padding-top: 80px; 
}
.scene-container {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100vh; z-index: 1;
}
.loading-fallback {
  display: flex; justify-content: center; align-items: center;
  width: 100%; height: 100%; color: white;
}
.text-overlay {
  position: absolute; bottom: 9vh; left: 50%;
  transform: translateX(-50%);
  width: 80%; max-width: 900px;
  z-index: 2;
  background: rgba(240, 240, 240, 0.1);
  backdrop-filter: blur(15px);
  padding: 25px 35px; border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: grid; grid-template-columns: 1fr 1.5fr;
  align-items: center; gap: 30px;
}
.fade-enter-active,
.fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
.projektTekst {
  font-weight: 600; color: #0300c7;
  font-size: clamp(1.5rem, 2.5vw, 1rem); margin: 0;
  font-family: panchang;
}
.tekstBeskrivelse {
  font-weight: 400; color: #0300c7;
  font-size: clamp(0.9rem, 2.5vw, 1.1rem); margin: 0;
  line-height: 1.6;
  font-family: panchang;
}
</style>