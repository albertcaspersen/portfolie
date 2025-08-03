<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import gsap from 'gsap';
import Navbar from './components/navbar.vue';
import Designstud from './components/Designstud.vue';
import { hasAnimatedAbout } from './animationState';

// --- VUE REFS (uændret) ---
const bogstavContainerRef = ref(null);
const bogstavARef = ref(null);
const bogstavVRef = ref(null);
const startTekstRef = ref(null);
const albertRef = ref(null);
const valdemarRef = ref(null);
const infoRef = ref(null);
const pilRef = ref(null);
const migPicRef = ref(null);
const beskrivelseRef = ref(null);

// Opret en matchMedia-instans, som vi kan genbruge.
const mm = gsap.matchMedia();

// --- HJÆLPEFUNKTIONER (uændrede) ---
// Genanvendelig typewriter-funktion
function typeWriterEffect(element, text, speed) {
  let proxy = { val: 0 };
  return gsap.to(proxy, {
    val: text.length,
    duration: text.length * (speed / 1000),
    ease: "none",
    onUpdate: () => {
      if (element) {
        element.textContent = text.substring(0, Math.round(proxy.val));
      }
    }
  });
}

// Funktion til at slette tekst med "typewriter"-effekt
function deleteWriterEffect(element, text, speed) {
  let proxy = { val: text.length };
  return gsap.to(proxy, {
    val: 0,
    duration: text.length * (speed / 1000),
    ease: "none",
    onUpdate: () => {
      if (element) {
        element.textContent = text.substring(0, Math.round(proxy.val));
      }
    }
  });
}

// --- RESPONSIV ANIMATIONSLOGIK ---
function setupResponsiveAnimations() {
  // Brug matchMedia til at definere forskellige animationer for forskellige skærmstørrelser
  mm.add({
    // NYT: Justerede breakpoints for mere granulær kontrol
    isDesktop: "(min-width: 769px)",
    isTablet: "(min-width: 600px) and (max-width: 768px)",
    isMobile: "(max-width: 599px)"
  }, (context) => {
    // Få de aktive betingelser fra context-objektet
    let { isDesktop, isTablet, isMobile } = context.conditions;

    if (isDesktop) {
        // Nulstil elementernes starttilstand for desktop
        gsap.set([albertRef.value, valdemarRef.value, infoRef.value, pilRef.value, migPicRef.value, beskrivelseRef.value, startTekstRef.value], { opacity: 0 });
        gsap.set(bogstavContainerRef.value, { display: 'block', opacity: 1, x: 0, y: 0, rotation: 0 });
        gsap.set(bogstavARef.value, { x: 0, y: 0 });
        gsap.set(bogstavVRef.value, { x: 0, y: 0 });
        if (startTekstRef.value) startTekstRef.value.textContent = '';
        if (albertRef.value) albertRef.value.textContent = '';
        if (valdemarRef.value) valdemarRef.value.textContent = '';
        if (infoRef.value) infoRef.value.textContent = '';

        const masterTimeline = gsap.timeline();

        // Brug context.add() til at registrere animationen for desktop.
        context.add(() => {
          masterTimeline
            .to(bogstavContainerRef.value, { rotation: 630, duration: 1, ease: 'power3.out' })
            .to(bogstavARef.value, { y: -400, duration: 1, ease: 'power3.out' })
            .to(bogstavVRef.value, { y: 400, duration: 1, ease: 'power3.out' }, "<")
            .to(startTekstRef.value, { opacity: 1, duration: 0.1, ease: 'power2.out' })
            .add(typeWriterEffect(startTekstRef.value, 'Hello World!', 80))
            .add(deleteWriterEffect(startTekstRef.value, 'Hello World!', 80), '+=1')
            .to(bogstavARef.value, { y: 25, duration: 1, ease: 'power2.out' })
            .to(bogstavVRef.value, { y: -48, duration: 1, ease: 'power2.out' }, "<")
            .to(bogstavContainerRef.value, {
                rotation: '+=90',
                x: -726,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out'
            })
            .to([albertRef.value, valdemarRef.value], { opacity: 1, duration: 0.5, ease: 'power2.out' })
            .add(() => {
                const albertText = 'Albert ';
                const valdemarText = 'Valdemar';
                const combinedText = albertText + valdemarText;
                let proxy = { val: 0 };
                gsap.to(proxy, {
                    val: combinedText.length,
                    duration: combinedText.length * (80 / 1000),
                    ease: 'none',
                    onUpdate: () => {
                        const currentPos = Math.round(proxy.val);
                        if (albertRef.value) albertRef.value.textContent = combinedText.substring(0, Math.min(currentPos, albertText.length));
                        if (valdemarRef.value) valdemarRef.value.textContent = combinedText.substring(albertText.length, Math.max(albertText.length, currentPos));
                    }
                });
            })
            .to(bogstavContainerRef.value, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => gsap.set(bogstavContainerRef.value, { display: 'none' }) }, ">1.2")
            .to([pilRef.value, infoRef.value, migPicRef.value, beskrivelseRef.value], {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1
            })
            .to(pilRef.value, { y: -20, duration: 0.5, yoyo: true, repeat: -1, ease: 'power2.inOut', repeatDelay: 1.0 })
            .add(typeWriterEffect(infoRef.value, 'I am working on creating user-friendly and aesthetic digital solutions. Check out my projects and feel free to contact me!', 35), "<");
        });
    } else if (isMobile || isTablet) { // NYT: Samler logik for tablet og mobil
        // Skjul A og V og spring animationen over på mobil
        gsap.set(bogstavContainerRef.value, { display: 'none' });
        setupFinalState();
    }
  });
}

// Funktion til at sætte siden til sin endelige tilstand
function setupFinalState() {
  gsap.set(bogstavContainerRef.value, { display: 'none', opacity: 0 });
  gsap.set(startTekstRef.value, { opacity: 0 });

  if (albertRef.value) albertRef.value.textContent = 'Albert ';
  if (valdemarRef.value) valdemarRef.value.textContent = 'Valdemar';
  if (infoRef.value) infoRef.value.textContent = 'I am working on creating user-friendly and aesthetic digital solutions. Check out my projects and feel free to contact me!';

  gsap.set([albertRef.value, valdemarRef.value, infoRef.value, migPicRef.value, beskrivelseRef.value, pilRef.value], { opacity: 1 });

  if (pilRef.value) {
       gsap.to(pilRef.value, {
          y: -20, duration: 0.5, yoyo: true,
          repeat: -1, ease: 'power2.inOut', repeatDelay: 1.0
      });
  }
}

// --- VUE LIFECYCLE HOOKS (uændret) ---
onMounted(() => {
    if (!hasAnimatedAbout.value) {
        setupResponsiveAnimations();
        hasAnimatedAbout.value = true;
    } else {
        setupFinalState();
    }

    if (pilRef.value) {
        pilRef.value.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
});

onBeforeUnmount(() => {
  mm.revert();
});
</script>

<template>
    <!-- Template er uændret -->
    <div class="grid-container">
        <h1 class="bogstav" ref="bogstavContainerRef">
            <span class="bogstav-a" ref="bogstavARef">A</span><br />
            <span class="bogstav-v" ref="bogstavVRef">V</span>
        </h1>
        <div class="startTekst" style="opacity: 0;" ref="startTekstRef"></div>
        <div class="slutTekst" style="opacity: 0;"></div>

        <Navbar />
        <Designstud />
        
        <div class="grid-item grid-albert">
            <h1 class="Albert" ref="albertRef"></h1>
        </div>
        
        <div class="grid-item grid-infoTekst">
            <h2 class="info" ref="infoRef"></h2>
        </div>
        
        <div class="grid-item grid-valdemar">
            <h1 class="Valdemar" ref="valdemarRef"></h1>
        </div>
        
        <div class="grid-item grid-migPic">
            <img class="migPic" src="./assets/billeder/mighehe2.jpg" ref="migPicRef">
        </div>
        
        <div class="grid-item grid-pil">
            <img class="pil-billede" src="./assets/billeder/arrow-top-right.png" ref="pilRef">
        </div>
        
        <div class="grid-item grid-beskrivelse beskrivelse" ref="beskrivelseRef">
            <div class="omMig">
                Hello! <br> I’m a Coded Design student at the Danish school of media and journalism.
            </div>
            <div class="omMig2">
                My work explores the space between simplicity and complexity — creating designs that are both engaging and intuitive. I enjoy pushing myself with technically advanced features like playful animations and Three.js, always with a focus on maintaining clarity and ease of use.
                My goal is to build things that are fun to use — and just as enjoyable to make.
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Din eksisterende desktop CSS er uændret heroppe */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto auto auto auto;
    gap: 20px;
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
    background-color: transparent;
}
.grid-albert { grid-column: 1 / 5; grid-row: 3; }
.grid-valdemar { grid-column: 1 / 5; grid-row: 4; }
.grid-migPic { grid-column: 9 / 13; grid-row: 5; }
.grid-beskrivelse { grid-column: 2 / 8; grid-row: 5; }
.grid-explorebox { grid-column: 10 / 13; grid-row: 6; }
.grid-infoTekst { grid-column: 11 / 13; grid-row: 3; }

/* Desktop styling for pilen */
.grid-pil { 
    grid-column: 12 / 13; 
    grid-row: 4; 
}

.pil-billede {
    transform: rotate(135deg);
    position: absolute;
    height: 6vh;
    margin-top: 11.5vh;
    right: 2vw;
    cursor: pointer;
    opacity: 0; /* Animeres via GSAP */
}

.Albert {
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 23vh;
    line-height: 1;
    margin: 0;
    margin-top: 43vh;
    color: #0300c7;
    margin-bottom: -2vh;
    margin-left: 1vw;
}
.Valdemar {
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 23vh;
    line-height: 1;
    margin: 0;
    color: #0300c7;
    margin-left: 1vw;
    margin-bottom: 17vh;
}


.migPic {
    height: 60vh; margin-top: 21vh; margin-bottom: 17vh;
}

.migPic,
.grid-beskrivelse {
    opacity: 0;
    transition: opacity 0.3s ease;
}
.omMig {
    font-family: 'Panchang-medium', 'Arial', sans-serif;
    color: #0300c7;
    font-size: 2.5rem;
    margin-top: 25vh;
}
.omMig2 {
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    color: #0300c7;
    font-size: 1.5rem;
    margin-top: 3vh;
}
.explore {
    margin-top: 25vh;
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    color: #0300c7;
    font-size: 1rem;
    margin-top: 12vh;
}
.bogstav {
    position: absolute;
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    color: #0300c7;
    top: 47vh;
    left: 43vw;
    z-index: 2;
    margin-bottom: 30vh;
    font-weight: 400;
}
.bogstav span {
    display: inline-block;
    font-size: 23vh;
}
.startTekst {
    position: absolute;
    top: 75vh;
    left: 39vw;
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    color: #0300c7;
    font-size: 3rem;
    margin-bottom: 3vh;
}
.info {
    font-family: 'Panchang-light', 'Arial', sans-serif;
    font-weight: 100;
    color: #0300c7;
    font-size: 1.2rem;
}

/* Generel mobil-styling (op til 600px) */
@media (max-width: 600px) {
    .grid-container {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto;
        gap: 10px;
        padding: 0;
        width: 100%;
    }

    .Albert, .Valdemar {
        font-family: 'Panchang', 'Arial', sans-serif;
        font-weight: 400; 
        font-size: 3.5rem;
        line-height: 1.1;
        margin: 0;
        color: #0300c7;
        margin-left: 1vw;
        padding: 0px;
    }

    .info {
        font-weight: 300;
        color: #0300c7;
        font-size: 1rem;
        font-family: 'Panchang', 'Arial', sans-serif;
    }

    .grid-infoTekst { 
        grid-column: 1 / 13; 
        grid-row: 3; 
        margin-left: 3%; 
        max-width: 50%; 
        margin-top: 10%;
    }

    .Albert {
        font-weight: 400;
        font-size: 3.5rem;
        line-height: 1;
        margin: 0;
        margin-top: 65vh;
        color: #0300c7;
        margin-bottom: -2vh;
        margin-left: 1vw;
    }
    
    .Valdemar {
        font-weight: 400;
        font-size: 3.5rem;
        line-height: 1;
        margin: 0;
        color: #0300c7;
        margin-left: 1vw;
        padding: 0px;
    }

    .grid-pil { 
        grid-column: 11 / 13;
        grid-row: 4;
        margin-top: 1.8vh;
        margin-left: 40%;
    }
    
    .pil-billede {
        position: static;
        height: 25px;
        width: 25px;
        margin: 0; 
        padding: 0px;
    }

    .omMig {
        font-weight: 600; 
        color: #0300c7;
        font-size: 1.2rem;
        margin-top: 20vh;
        padding: 0px;
        font-family: 'Panchang', 'Arial', sans-serif;
    }

    .omMig2 {
        color: #0300c7;
        font-size: 0.9rem;
        margin-top: 3vh;
        max-width: 85vw;
        padding: 0px;
        font-family: 'Panchang', 'Arial', sans-serif;
    }

    .grid-beskrivelse { grid-column: 2 / 13; grid-row: 5; }

    .grid-migPic { 
        grid-column: 2 / 13; 
        grid-row: 5; 
        margin-top: 61vh;
        display: flex;
        padding: 0px;
    }

    .migPic {
        height: 20vh;
        width: 40%;
        object-fit: cover;
        margin: 0;
        margin-bottom: 5vh;
    }
}

/* 
 * NYT: Specifik styling for iPhone 15 og lignende smalle enheder.
 * Disse regler overskriver reglerne fra (max-width: 600px) på skærme,
 * der er 420px eller smallere, som f.eks. iPhone 15 (393px).
*/
@media (max-width: 420px) {
    .Albert, .Valdemar {
        /* Lidt mindre font for at sikre, det passer på smalle skærme */
        font-size: 3.1rem; 
    }

    .Albert {
        /* Juster to-margin for at passe til den nye font-størrelse */
        margin-top: 68vh;
    }

    .omMig {
        font-size: 1rem;
        margin-top: 18vh; /* Finjuster den vertikale position */
        max-width: 80vw;
    }

    .omMig2 {
        font-size: 0.85rem; /* Gør brødteksten en smule mindre */
        max-width: 80vw; /* Tillad lidt mere bredde hvis nødvendigt */

    }

    .migPic {
        height: 18vh; /* Juster billedhøjden for at balancere layoutet */
    }

    .grid-migPic {
        margin-top: 60vh; /* Juster billedets position ift. ny tekststørrelse */
        padding-top: 5vh;
    }
}

</style>