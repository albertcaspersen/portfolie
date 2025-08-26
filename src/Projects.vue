<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue' // 'watch' er tilføjet
import Navbar from './components/navbar.vue'
import Designstud from './components/Designstud.vue'
import ProjectScene from './components/ProjectScene.vue'
import gsap from 'gsap'

// IMPORTER DEN CENTRALE TEMA-TILSTAND
import { isDarkMode } from './themeState.js';

// NYT: RESPONSIVITETS-LOGIK
const isMobile = ref(false);

// OPDATERET: STYR TEMA OG SCROLL I KOMPONENTENS LIVSCYKLUS
onMounted(() => {
    isDarkMode.value = true;

    // Tjek skærmstørrelse ved start
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = (e) => isMobile.value = e.matches;
    mediaQuery.addEventListener('change', handleResize);
    isMobile.value = mediaQuery.matches; // Sæt den initielle værdi

    // Styr scroll baseret på om det er mobil eller ej
    if (isMobile.value) {
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
});

onUnmounted(() => {
    isDarkMode.value = false;
    document.body.style.overflow = 'auto'; // Gendan altid scroll ved unmount
    // Ryd op i event listener
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.removeEventListener('change', (e) => isMobile.value = e.matches);
});

// NYT: Watcher der reagerer, hvis brugeren ændrer browservindue-størrelse
watch(isMobile, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
});

// Funktion til at skabe en CSS-venlig streng
const toCssClass = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// PROJEKT-DATA
const projects = ref([
    {
        id: 0,
        title: "Projection mapping",
        description: "The task...",
        longDescription: "This project was about creating a reinterpreted version of camouflage using Processing, and then projection mapping the pattern onto a mannequin. I had previously come across 'reaction diffusion' patterns, which I found to be a perfect fit for the project.",
        media: new URL('./assets/sliderContent/lola.mp4', import.meta.url).href,
        mediaType: 'video',
        galleryImages: [
            { src: new URL('./assets/gallery/projection_1.jpg', import.meta.url).href, alt: ''},
            { src: new URL('./assets/gallery/projection_2.jpg', import.meta.url).href, alt: ''},
            { src: new URL('./assets/gallery/reaktion.mp4', import.meta.url).href, alt: 'Reaktionsvideo', type: 'video' }
        ]
    },
    {
        id: 1,
        title: "Ocean storm animation",
        description: "I actually followed...",
        longDescription: "This project was mainly an exercise in using Blender, as I believe it has great potential across many types of projects. I followed a tutorial to create a large ocean.",
        longDescription2: "I experimented with volumetric shaders, keyframe animations, and particle effects for the raindrops",
        longDescription3: "What I find great about following tutorials is gaining insight into different methods and new approaches for future projects. You don’t even have to master every newly learned feature — just knowing it exists gives you the opportunity to explore and apply it in future work.",
        longDescription4: "After completing the animation, I added sound design in FL Studio, which greatly enhanced the final result.",
        media: new URL('./assets/sliderContent/Minfilm2.mp4', import.meta.url).href,
        mediaType: 'video',
        galleryImages: [
            { src: new URL('./assets/gallery/ocean1.png', import.meta.url).href, alt: 'Billede af havanimation', type: 'image' },
            { src: new URL('./assets/gallery/ocean2.png', import.meta.url).href, alt: 'Endnu et billede af havanimation', type: 'image' }
        ]
    },
    {
        id: 2,
        title: "Interactive horror story",
        description: "The task for this project...",
        longDescription: "The aim of this project was to create an interactive horror experience. I drew inspiration from walking simulators and indie games, incorporating elements that best suited the concept. I focused heavily on environment design, atmosphere, and lighting—elements that were not only crucial to the experience but also among the most enjoyable aspects of the project to develop.",
        longDescription2: "I created the forest environment in Blender, starting with a small forest model as a base. I duplicated and rotated the model multiple times to form a large, dense forest and added a plane beneath it to naturally create a path for the user to follow.",
        longDescription3: "I wrote and narrated the horror story. I edited the recordings and placed each recording in their seperate lantern across the forest. You are essentially walking around the forest finding and clicking on each lantern to hear the whole story. I also thought of including props that related to the story, but i got limited by computer power.",
        longDescription4: "I am very satisfied with the end product, and learned so much about how strong some small elements can be. lighting, music etc.",
        media: new URL('./assets/sliderContent/skov.mp4', import.meta.url).href,
        mediaType: 'video',
        galleryImages: [
            { src: new URL('./assets/gallery/gyser2.png', import.meta.url).href, alt: 'Screenshot fra den interaktive gyserhistorie', type: 'image' },
            { src: new URL('./assets/gallery/gyser3.png', import.meta.url).href, alt: 'Endnu et screenshot fra gyserhistorien', type: 'image' }
        ]
    },
    {
        id: 3,
        title: "'While in battle'",
        description: "This was part of an exam...",
        longDescription: "This poster was part of an exam assignment, where we were tasked with designing a poster for the dance performance 'while in battle I’m free, never free to rest.'",
        longDescription2: "The performance 'while in battle I’m free, never free to rest', explores ethnicity, conflict, love, and understanding. I chose a typeface that contrasts structured forms with more fluid shapes.",
        longDescription3: "I prompted an image of arms that strongly conveyed conflict, diversity, and love, which really fit perfectly into the composition of the poster.",
        media: new URL('./assets/sliderContent/whileInBattle.jpg', import.meta.url).href,
        mediaType: 'image'
    },
    {
        id: 4,
        title: "Having some fun with perlin noise",
        description: "I made this cool...",
        longDescription: "I came across someone who had made a really cool sphere using Perlin noise to distort its shape, which inspired me to create this Processing sketch.",
        longDescription2: "I created a simple sphere, added colors and Perlin noise, and included a variable to adjust the noise intensity, giving the sphere a dynamic, living appearance.", 
        media: new URL('./assets/sliderContent/sphereM.mp4', import.meta.url).href,
        mediaType: 'video',
        galleryImages: [
            { src: new URL('./assets/gallery/sphereKode.png', import.meta.url).href, alt: 'sphere koden', type: 'image' }
        ]
    },
    {
        id: 5,
        title: "Exam project about oxygen depletion for Videnskab.dk",
        description: "I made this cool...",
        longDescription: "This project was created for Videnskab.dk to engage children (ages 10–13) with the environmental issue of oxygen depletion in Danish waters. The player take on the role of an underwater photographer documenting signs of oxygen depletion, assisted by an AI-powered guide (OpenAI API) that answers the players questions in real time. After capturing a set amount of photos, players view their images in a gallery paired with information from Videnskab.dk.",
        longDescription2: "This was my first time implementing multiple API-calls and have them work together, which worked perfectly in the end with somewhat fluent back and forth conversation pace.",
        longDescription3: "",
        longDescription4: "Basic understanding of using Blender came a long way for this project, and applying API-calls turned out to be a great but challenging succes.",
        media: new URL('./assets/sliderContent/HavetUnderPres.mp4', import.meta.url).href,
        mediaType: 'video',
        galleryImages: [
            { src: new URL('./assets/gallery/videnskabKode.png', import.meta.url).href, alt: 'Billede fra Videnskab.dk projektet', type: 'image' },
            { src: new URL('./assets/gallery/videnskab2.png', import.meta.url).href, alt: 'Endnu et billede fra Videnskab.dk projektet', type: 'image' }
        ]
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

const isMuted = ref(true)
function toggleMute() {
    isMuted.value = !isMuted.value
}

// GSAP transition hooks (OPDATERET MED MOBIL-TJEK)
const onEnter = (el, done) => {
    // NYT: Tjek om vi er på mobil. Hvis ja, vis elementet øjeblikkeligt og afslut.
    if (isMobile.value) {
        gsap.set(el, { autoAlpha: 1 });
        done();
        return;
    }

    // Denne kode kører kun på desktop
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
        .from(el.querySelectorAll('h2, p, button, img, video'), { autoAlpha: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, "-=0.8");
};

const onLeave = (el, done) => {
    // NYT: Tjek om vi er på mobil. Hvis ja, skjul elementet øjeblikkeligt og afslut.
    if (isMobile.value) {
        gsap.set(el, { autoAlpha: 0 });
        done();
        return;
    }

    // Denne kode kører kun på desktop
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
        <svg style="position:absolute; width:0; height:0;">
            <filter id="noise-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.0 0.0" numOctaves="1" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" />
            </filter>
        </svg>

        <div class="grid-container">
            <Navbar />
            <Designstud />
        </div>

        <!-- =========== DESKTOP CONTAINER =========== -->
        <!-- Denne container med 3D-scenen vil blive skjult på mobil via CSS -->
        <div class="page-container">
            <button @click="toggleMute" class="audio-toggle-button">
                <!-- SVG ikoner -->
                <svg v-if="isMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.49 15.2 21 13.66 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.34-.3 2.57-.92 3.61-1.75l2.08 2.08L21 20.73l-9-9L4.27 3z" /></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
            </button>

            <div class="scene-container">
                <Suspense>
                    <ProjectScene :projects="projects" :is-globally-muted="isMuted" @project-focus="updateActiveProject"
                        @project-click="selectProject" />
                    <template #fallback>
                        <div class="loading-fallback"><p>Loading 3D Experience...</p></div>
                    </template>
                </Suspense>
            </div>

            <Transition name="fade">
                <div v-if="!selectedProject" class="text-overlay">
                    <h1 class="projektTekst">{{ activeProject.title }}</h1>
                </div>
            </Transition>
        </div>

        <!-- =========== NY MOBIL CONTAINER =========== -->
        <!-- Denne liste vil KUN blive vist på mobil via CSS -->
        <div class="mobile-projects-list">
            <div 
                v-for="project in projects" 
                :key="project.id" 
                class="mobile-project-card" 
                @click="selectProject(project)"
            >
                <div class="mobile-card-media">
                    <img v-if="project.mediaType === 'image'" :src="project.media" :alt="project.title">
                    <video v-else-if="project.mediaType === 'video'" :src="project.media" autoplay loop muted playsinline></video>
                </div>
                <div class="mobile-card-info">
                    <h3>{{ project.title }}</h3>
                </div>
            </div>
        </div>


        <Transition @enter="onEnter" @leave="onLeave" :css="false">
            <div v-if="selectedProject" :class="['project-details', toCssClass(selectedProject.title)]">
                
                <div class="details-grid-content">

                    <h2 class="col-3-to-9" style="margin-bottom: 5vh;">{{ selectedProject.title }}</h2>
                    
                    <div class="media-container col-3-to-9">
                        <img v-if="selectedProject.mediaType === 'image'" :src="selectedProject.media" :alt="selectedProject.title">
                        <video v-else-if="selectedProject.mediaType === 'video'" :src="selectedProject.media" autoplay loop muted playsinline></video>
                    </div>

                    <p class="long-description col-3-to-8">{{ selectedProject.longDescription }}</p>
                    <p v-if="selectedProject.longDescription2" class="long-description-2 col-3-to-9">{{ selectedProject.longDescription2 }}</p>
                    <p v-if="selectedProject.longDescription3" class="long-description-3 col-3-to-9">{{ selectedProject.longDescription3 }}</p>
                    <p v-if="selectedProject.longDescription4" class="long-description-4 col-8-to-12">{{ selectedProject.longDescription4 }}</p>

                    <template v-if="selectedProject.galleryImages && selectedProject.galleryImages.length > 0">
                        <div v-for="(item, index) in selectedProject.galleryImages" :key="index"
                            :class="['gallery-item', `gallery-item-${toCssClass(selectedProject.title)}-${index}`]">
                            <img v-if="item.type === 'image'" :src="item.src" :alt="item.alt">
                            <video v-else-if="item.type === 'video'" :src="item.src" autoplay loop muted playsinline></video>
                        </div>
                    </template>

                    <div class="back-button-container col-1-to-12">
                        <button @click="selectedProject = null">Return to overview</button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.project-details {
    background-color: #030765;
    color: #FFFFFF;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 5;
    font-family: panchang;
    box-sizing: border-box;
}

/* ================================================================== */
/* 1. HOVED-GRID DEFINITION */
/* ================================================================== */
.details-grid-content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
}

/* ================================================================== */
/* 2. KOLONNE-KLASSER TIL HOVED-GRID'ET */
/* ================================================================== */
.col-1-to-12 { grid-column: 1 / -1; }
.col-3-to-9 { grid-column: 3 / span 7; }
.col-3-to-6 { grid-column: 3 / span 4; }
.col-7-to-9 { grid-column: 7 / span 3; }
.col-2-to-6 { grid-column: 2 / span 5; }
.col-7-to-11 { grid-column: 7 / span 5; }
.col-3-to-8 { grid-column: 3 / span 6; }
.col-8-to-12 { grid-column: 8 / span 4; }

/* ================================================================== */
/* 3. GENEREL LAYOUT (GÆLDER FOR ALLE PROJEKTER) */
/* ================================================================== */
.details-grid-content h2 { grid-row: 1; padding-top: 9vh; font-size: clamp(2rem, 5vw, 3.5rem); margin: 0; }
.media-container { grid-row: 2; }
.back-button-container { grid-row: 8; }

.long-description, .long-description-2, .long-description-3, .long-description-4 {
    font-size: 1.1rem;
    line-height: 1.8;
    margin: 0;
}

.gallery-item img,
.gallery-item video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 8px;
}

/* ================================================================== */
/* 4. PROJEKT-SPECIFIK LAYOUT */
/* ================================================================== */

/* --- Layout for INTERACTIVE HORROR STORY (ID 2) --- */
.interactive-horror-story .long-description { grid-row: 3; grid-column: 3 / span 8; margin-bottom: 5vh; margin-top: 5vh; }
.interactive-horror-story .long-description-2 { grid-row: 4; grid-column: 3 / span 4; max-width: 30vw; margin-top: 7vh; }
.interactive-horror-story .long-description-3 { grid-row: 5; grid-column: 3 / span 9; margin-top: 5vh; margin-bottom: 5vh;}
.interactive-horror-story .long-description-4 { grid-row: 6; grid-column: 7 / span 4; margin-top: 9vh;}
.interactive-horror-story .gallery-item-interactive-horror-story-0 { grid-row: 6; grid-column: 3 / span 4; }
.interactive-horror-story .gallery-item-interactive-horror-story-1 { grid-row: 4; grid-column: 7 / span 4; }

/* --- Layout for VIDENSKAB.DK PROJEKTET (ID 5) --- */
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description { grid-row: 3; grid-column: 3 / span 8; margin-top: 5vh;}
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description-2 { grid-row: 4; grid-column: 3 / span 5; margin-top: 16vh; max-width: 30vw;}
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description-3 { grid-row: 5; grid-column: 3 / span 8; margin-top: 5vh; }
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description-4 { grid-row: 6; grid-column: 7 / span 4; margin-top: 17vh; }
.exam-project-about-oxygen-depletion-for-videnskabdk .gallery-item-exam-project-about-oxygen-depletion-for-videnskabdk-0 { grid-row: 4; grid-column: 7 / span 4; margin-top: 5vh; }
.exam-project-about-oxygen-depletion-for-videnskabdk .gallery-item-exam-project-about-oxygen-depletion-for-videnskabdk-1 { grid-row: 6; grid-column: 3 / span 4; margin-top: 5vh;}

/* --- Layout for PERLIN NOISE (ID 4) --- */
.having-some-fun-with-perlin-noise .media-container {
    max-width: 50vw;
}

/* --- Layout for 'WHILE IN BATTLE' (ID 3) --- */
.while-in-battle .media-container {
    max-width: 45vw;
}
.while-in-battle .long-description { grid-row: 2; grid-column: 9 / span 4; max-width: 30vw;}
.while-in-battle .long-description-2 { grid-row: 2; grid-column: 9 / span 4; margin-top: 45vh; max-width: 30vw;}
.while-in-battle .long-description-3 { grid-row: 2; grid-column: 9 / span 4; margin-top: 99vh; max-width: 30vw; }

/* --- Layout for OCEAN STORM ANIMATION (ID 1) --- */
.ocean-storm-animation .long-description { grid-row: 3; grid-column: 3 / span 8; margin-top: 5vh; margin-bottom: 5vh;}
.ocean-storm-animation .long-description-2 { grid-row: 4; grid-column: 3 / span 8; margin-top: 11vh; max-width: 30vw; }
.ocean-storm-animation .long-description-3 { grid-row: 5; grid-column: 3 / span 8; }
.ocean-storm-animation .long-description-4 { grid-row: 6; grid-column: 7 / span 5; margin-top: 17vh; max-width: 30vw; }
.ocean-storm-animation .gallery-item-ocean-storm-animation-0 { grid-row: 4; grid-column: 7 / span 4; margin-bottom: 5vh; }
.ocean-storm-animation .gallery-item-ocean-storm-animation-1 { grid-row: 6; grid-column: 3 / span 4; margin-top: 5vh;}

.projection-mapping .long-description {grid-row: 2; grid-column: 8 / span 4; margin-top: 10vh;}
.projection-mapping .media-container { max-width: 35vw;}
.projection-mapping .gallery-item-projection-mapping-2 {grid-row: 2; grid-column: 8 / span 4; max-width: 40vw; margin-top: 40vh;}

.having-some-fun-with-perlin-noise .long-description {grid-row: 2; grid-column: 8 / span 4; max-width: 30vw; margin-top: 15rem;}
.having-some-fun-with-perlin-noise .long-description-2 {grid-row: 3; grid-column: 3 / span 4; max-width: 30vw; margin-top: 25vh;}
.having-some-fun-with-perlin-noise .media-container {max-width: 40rem;}
.having-some-fun-with-perlin-noise .gallery-item-having-some-fun-with-perlin-noise-0 {grid-row: 3; grid-column: 8 / span 4; margin-top: 5rem;}

.media-container img,
.media-container video {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
}


.back-button-container {
    text-align: center;
    padding: 2rem 0 4rem 0;
}




.details-grid-content button {
    display: inline-block; padding: 12px 25px; background-color: #FFFFFF; color: #030765;
    border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 500;
    transition: background-color 0.3s ease; font-family: panchang;
}

.audio-toggle-button { position: fixed; bottom: 20px; left: 20px; z-index: 20; background-color: rgba(0, 0, 10, 0.4); backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 50%; width: 100px; height: 100px; display: flex; justify-content: center; align-items: center; cursor: pointer; transition: transform 0.2s ease, background-color 0.2s ease; padding: 0; }
.audio-toggle-button:hover { transform: scale(1.1); background-color: rgba(0, 0, 10, 0.6); }
.audio-toggle-button svg { width: 24px; height: 24px; color: #FFFFFF; }
.grid-container { display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: auto; gap: 20px; padding: 0; margin: 0; width: 100%; position: fixed; top: 0; left: 0; background: transparent; z-index: 10; }
.page-container { width: 100vw; height: 100vh; margin: 0; padding: 0; position: relative; }
.scene-container { position: absolute; top: 0; left: 0; width: 100%; height: 100vh; z-index: 1; }
.loading-fallback { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; color: white; }
.text-overlay { position: absolute; bottom: 9vh; left: 50%; transform: translateX(-50%); max-width: auto; z-index: 2; background: rgba(0, 0, 10, 0.4); backdrop-filter: blur(15px); padding: 25px 35px; border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.2); display: grid; grid-template-columns: 1fr 0.0fr; align-items: center; gap: 30px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.projektTekst { font-weight: 600; color: #FFFFFF; font-size: clamp(1.5rem, 2.5vw, 1rem); margin: 0; font-family: 'Panchang-Medium', sans-serif;}
.tekstBeskrivelse { font-weight: 400; color: #FFFFFF; font-size: clamp(0.9rem, 2.5vw, 1.1rem); margin: 0; line-height: 1.6; font-family: 'Panchang-Regular', sans-serif;}


/* ================================================================== */
/* 5. NYT: RESPONSIVT LAYOUT (MOBIL FØRST TILGANG) */
/* ================================================================== */

/* Standard (Desktop) - Skjul mobillisten */
.mobile-projects-list {
    display: none;
}

/* Mobil-visning */
@media (max-width: 768px) {
    /* Skjul desktop-containeren (3D-scenen) */
    .page-container {
        display: none;
    }

    /* Vis og style mobillisten */
    .mobile-projects-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 80px 0.9rem 2rem 0.9rem; /* Plads til navbar i toppen */
        background-color: #00001a9f; /* Mørk baggrund til mobil */
        color: #FFFFFF;
    }

    .mobile-project-card {
        background-color: #030665; /* Lidt lysere end baggrunden */
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.2s ease-out;
    }

    .mobile-project-card:active {
        transform: scale(0.98); /* Lille effekt ved tryk */
    }

    .mobile-card-media img,
    .mobile-card-media video {
        width: 100%;
        height: 250px; /* Ensartet højde for alle kort */
        object-fit: cover; /* Sikrer billedet dækker uden at blive forvrænget */
        display: block;
    }

    .mobile-card-info {
        padding: 1rem 1.2rem;
    }

    .mobile-card-info h3 {
        margin: 0;
        font-family: 'Panchang', sans-serif;
        font-size: 1.2rem;
    }

    /* Skjul lyd-knappen på mobil, da den er til 3D-scenen */
    .audio-toggle-button {
        display: none;
    }

    /* Overordnede regler for detaljevisning på mobil */
    .project-details { 
        padding: 60px 0 30px 0; 
    }
    .details-grid-content { 
        padding: 0 5vw; 
    }
    .details-grid-content > * { 
        grid-column: 1 / -1 !important; 
        grid-row: auto;
        margin-top: 0vh !important;
        margin-bottom: 2vh !important;
        max-width: none !important;
    }



    @media (max-width: 420px) {


        .long-description { 

            font-size: 0.7rem;
        }
        .long-description-2{ 
        
            font-size: 0.7rem;
        }
        
        .long-description-3{ 
        
            font-size: 0.7rem;
        }
        
        .long-description-4{ 
        
            font-size: 0.7rem;
        }

        .ocean-storm-animation .gallery-item-ocean-storm-animation-0 { grid-row: 4; grid-column: 7 / span 4; margin-bottom: 5vh; }
.ocean-storm-animation .gallery-item-ocean-storm-animation-1 { grid-row: 6; grid-column: 3 / span 4; margin-top: 5vh;}



.while-in-battle .long-description { grid-row: 2; grid-column: 9 / span 4; max-width: 30vw;}
.while-in-battle .long-description-2 { grid-row: 4; grid-column: 9 / span 4; margin-top: 45vh; max-width: 30vw;}
.while-in-battle .long-description-3 { grid-row: 5; grid-column: 9 / span 4; margin-top: 99vh; max-width: 30vw; }

.having-some-fun-with-perlin-noise .long-description {grid-row: 3; grid-column: 8 / span 4; max-width: 30vw; margin-top: 15rem;}
.having-some-fun-with-perlin-noise .long-description-2 {grid-row: 5; grid-column: 3 / span 4; max-width: 30vw; margin-top: 25vh;}
.having-some-fun-with-perlin-noise .media-container {max-width: 40rem;}
.having-some-fun-with-perlin-noise .gallery-item-having-some-fun-with-perlin-noise-0 {grid-row: 4; grid-column: 8 / span 4; margin-top: 5rem;}

.projection-mapping .gallery-item-projection-mapping-2 {grid-row: 4; grid-column: 8 / span 4; max-width: 40vw; margin-top: 40vh;}




.exam-project-about-oxygen-depletion-for-videnskabdk .long-description { grid-row: 3; grid-column: 3 / span 8; margin-top: 5vh;}
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description-2 { grid-row: 7; grid-column: 3 / span 5; margin-top: 16vh; max-width: 30vw;}
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description-3 { grid-row: 7; grid-column: 3 / span 8; margin-top: 5vh; }
.exam-project-about-oxygen-depletion-for-videnskabdk .long-description-4 { grid-row: 5; grid-column: 7 / span 4; margin-top: 17vh; }
.exam-project-about-oxygen-depletion-for-videnskabdk .gallery-item-exam-project-about-oxygen-depletion-for-videnskabdk-0 { grid-row: 6; grid-column: 7 / span 4; margin-top: 5vh; }
.exam-project-about-oxygen-depletion-for-videnskabdk .gallery-item-exam-project-about-oxygen-depletion-for-videnskabdk-1 { grid-row: 4; grid-column: 3 / span 4; margin-top: 5vh;}




    }



}
</style>