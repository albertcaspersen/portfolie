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
    // Definer dine breakpoints
    isDesktop: "(min-width: 600px)",
    isMobile: "(max-width: 599px)"
  }, (context) => {
    // Få de aktive betingelser fra context-objektet
    let { isDesktop, isMobile } = context.conditions;

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
    } else if (isMobile) {
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

// --- VUE LIFECYCLE HOOKS ---
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
    <div class="grid-container">
        <!-- 
          De absolut positionerede elementer er flyttet ind i containeren 
          for at forhindre dem i at skubbe til sidens layout. 
        -->
        <h1 class="bogstav" ref="bogstavContainerRef">
            <span class="bogstav-a" ref="bogstavARef">A</span><br />
            <span class="bogstav-v" ref="bogstavVRef">V</span>
        </h1>
        <div class="startTekst" style="opacity: 0;" ref="startTekstRef"></div>
        <div class="slutTekst" style="opacity: 0;"></div>

        <!-- Resten af sidens indhold følger herunder, som det var før -->
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
/* Din eksisterende CSS er uændret heroppe */
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

/* NYT: Styling for selve pil-billedet (erstatter inline style) */
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

@media (max-width: 600px) {


    .grid-container {
        display: grid;
        grid-template-columns: repeat(12, 1fr); /* Bevarer 12 kolonner for fleksibilitet */
        grid-template-rows: auto; /* Lad rækkerne tilpasse sig indholdet */
        gap: 10px; /* Reduceret gap for mobil */
        padding: 0; /* Tilføj lidt sidepolstring */
        width: 100%;
    }

    .Albert, .Valdemar {
        font-size: 4.5rem; /* Juster efter smag */
        line-height: 1.1;
        text-align: center;
        padding: 0;
        color: #0300c7;
    }

    .info {
        font-family: 'Panchang-light', 'Arial', sans-serif;
        font-weight: 100;
        color: #0300c7;
        font-size: 1rem;
    }

    .grid-infoTekst { 
        grid-column: 1 / 13; 
        grid-row: 3; 
        margin-left: 3%; 
        max-width: 50%; 
        margin-top: 10%;
    }

    .Albert {
        font-family: 'Panchang-Regular', 'Arial', sans-serif;
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
        font-family: 'Panchang-Regular', 'Arial', sans-serif;
        font-weight: 400;
        font-size: 3.5rem;
        line-height: 1;
        margin: 0;
        color: #0300c7;
        margin-left: 1vw;
        padding: 0px;
        

    }

    /* OPDATERET: Flyt pilens grid-container */
    .grid-pil { 
        grid-column: 11 / 13; /* Placeres ved siden af Valdemar */
        grid-row: 4;        /* Samme række som Valdemar */
        margin-top: 1.8vh;
        margin-left: 40%;  /* Finjuster vertikal position (juster efter behov) */
    }
    
    /* OPDATERET: Gør pilen mindre og nulstil dens position */
    .pil-billede {
        position: static; /* Ophæver 'position: absolute' fra desktop */
        height: 25px;     /* Gør pilen mindre */
        width: 25px;
        margin: 0; 
        padding: 0px;       /* Nulstil margin */
    }

    .omMig {
        font-family: 'Panchang-medium', 'Arial', sans-serif;
        color: #0300c7;
        font-size: 1.2rem;
        margin-top:15%;
        padding: 0px;
        margin-top: 20vh;
    }

    .omMig2 {
        font-family: 'Panchang-Regular', 'Arial', sans-serif;
        color: #0300c7;
        font-size: 0.9rem;
        margin-top: 3vh;
        max-width: 85vw;
        padding: 0px;
    }
    .grid-beskrivelse { grid-column: 2 / 13; grid-row: 5; }

    .grid-migPic { 
        grid-column: 2 / 13; 
        grid-row: 5; 
        margin-top: 61vh; /* Lidt luft over billedet */
        display: flex;
        padding: 0px;
        
    }
    .migPic {
        height: 20vh;     /* SÆT HØJDEN: Billedet vil være 50% af skærmens højde. Juster tallet efter smag (f.eks. 40vh, 60vh). */
        width: 40%;      /* FYLD BREDDEN: Får billedets 'ramme' til at fylde hele sin grid-container. */
        object-fit: cover;/* MAGIEN: Sørger for, at billedet dækker hele rammen uden at blive forvrænget. Den overskydende del af billedet beskæres. */
        margin: 0;
        margin-bottom: 5vh;
    }
    
}
</style>