<!-- Fil: Contact.vue -->

<script setup>
// Importer onUnmounted for oprydning
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import SplitType from 'split-type';
import Navbar from './components/navbar.vue'
import Designstud from './components/Designstud.vue'

// Refs til elementerne
const talkTextRef = ref(null);
const projectTextRef = ref(null);
const infoTextRef = ref(null);

// Definer split-variabler uden for hooks, så vi kan tilgå dem i onUnmounted
let talkTextSplit;
let infoTextSplit;

onMounted(() => {
  // Split begge tekstblokke op i linjer
  talkTextSplit = new SplitType(talkTextRef.value, { types: 'lines' });
  infoTextSplit = new SplitType(infoTextRef.value, { types: 'lines' });

  // Opret en samlet GSAP-tidslinje
  const tl = gsap.timeline();

  tl

      // 2. Animer den midterste tekstblok som en helhed
      .from(projectTextRef.value, {
      opacity: 0,
      y: 70,
      duration: 0.6,
      ease: 'power3.out'
    }, "-=0.0")
    // 1. Animer linjerne i den første tekstblok
    .from(talkTextSplit.lines, {
      opacity: 0,
      y: 70,
      duration: 0.7,
      stagger: 0.2, // Justeret stagger for en hurtigere, flydende effekt
      ease: 'power3.out'
    })

    // 3. Animer linjerne i infoteksten
    .from(infoTextSplit.lines, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power3.out'
    }, "-=0.4"); // Overlapper også en smule
});

// Rense-funktion: Kører når man navigerer væk fra siden
onUnmounted(() => {
  // Gendanner den oprindelige HTML-struktur for at undgå fejl
  if (talkTextSplit) talkTextSplit.revert();
  if (infoTextSplit) infoTextSplit.revert();
});
</script>

<template>
  <div class="grid-container">
    <Navbar />
    <Designstud />

    <h1 class="grid-item grid-talktext letstalk" ref="talkTextRef">
      Collaboration fuels my creativity – I love joining forces to turn bold ideas into reality. If you’re ready to build something exciting together, let’s connect. I’m currently looking for an internship this fall 2025.
    </h1>
    
    <p class="grid-item grid-gotaproject projecttekst" ref="projectTextRef">
      Got a project in mind?
    </p>

    <h2 class="grid-item grid-infotekst info" ref="infoTextRef">
      <span style="font-weight: 700;">Mail</span><br>
       <a href="mailto:albertcaspersen@hotmail.com" style="text-decoration: none; color: #0300c7;">albertcaspersen@hotmail.com</a><br><br>

      <span style="font-weight: 700; margin-top: 1rem;">Socials</span><br>
      <a href="https://www.instagram.com/albert_caspersen/" style="text-decoration: none; color: #0300c7;">Instagram</a><br>
      <a href="https://www.facebook.com/albert.caspersen?locale=da_DK" style="text-decoration: none; color: #0300c7;">Facebook</a><br><br>

      <span style="font-weight: 700; margin-top: 1rem;">Phone</span><br>
      +45 50557144
    </h2>
  </div>
</template>

<style scoped>
/* Din CSS ... */
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto auto auto auto;
  gap: 20px;
  position: relative;
  background-color: transparent;
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  overflow-y: visible;
}

.letstalk {
  color: #0300c7;
  font-family: 'Panchang', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 30vh;
  margin-left: 3.5vw;
}

/* OPDATERET: Kombineret CSS-regel for begge splittede tekstblokke */
.letstalk .line,
.info .line {
  overflow: hidden; /* Forhindrer "flash" af tekst før animation */
  display: block; /* Sikrer at hver linje tager fuld bredde */
  /* Nogle gange kan man have brug for at tilføje `position: relative` her,
     men prøv uden først. */
}

.grid-talktext {
  grid-column: 5/9;
  grid-row: 2;
}

.grid-gotaproject {
  grid-column: 5/12;
  grid-row: 2;
}

.projecttekst {
  font-family: 'Panchang', 'Arial', sans-serif;
  color: #0300c7;
  margin-top: 25vh;
  margin-left: 3.5vw;
  font-size: 1.3rem;
  font-weight: 600;
}

.info {
  color: #0300c7;
  font-family: 'Panchang', 'Arial', sans-serif;
  font-size: 1rem;
  margin-top: 15vh;
  font-weight: 200;
  text-align: right; /* tekstens linjer bliver højrejusteret */
}

.grid-infotekst {
  grid-column: 9/12;
  grid-row: 3;
  justify-self: end; /* hele boksen rykkes til højre */
}

/* ... Resten af din CSS er uændret ... */

@media (max-width: 600px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto auto auto auto;
    gap: 20px;
    position: relative;
    background-color: transparent;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    overflow-y: visible;
  }
  
  .grid-infotekst {
    grid-column: 10/13;
    grid-row: 3;
    margin-right: 13.6%;
    justify-self: end; /* hele boksen rykkes til højre */
  }
  



  body {
    overflow-x: hidden;
  }

  .projecttekst {
    font-family: 'Panchang', 'Arial', sans-serif;
    color: #0300c7;
    margin-top: 15vh;
    margin-left: 1vw;
    font-size: 1.0rem;
  }

  .grid-talktext {
    grid-column: 2/12;
    grid-row: 2;
  }

  .grid-gotaproject {
    grid-column: 2/12;
    grid-row: 2;
  }
  

  .letstalk {
    color: #0300c7;
    font-family: 'Panchang', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    margin-top: 19vh;
    margin-left: 1vw;

  }


}

@media (max-width: 420px) {



  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto auto auto auto;
    gap: 20px;
    position: relative;
    background-color: transparent;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    overflow-y: visible;
  }
  
  .grid-infotekst {
    grid-column: 10/13;
    grid-row: 3;
    margin-right: 13.6%;
    justify-self: end; /* hele boksen rykkes til højre */
  }
  



  body {
    overflow-x: hidden;
  }

  .projecttekst {
    font-family: 'Panchang', 'Arial', sans-serif;
    color: #0300c7;
    margin-top: 15vh;
    margin-left: 1vw;
    font-size: 1.0rem;
  }

  .grid-talktext {
    grid-column: 2/12;
    grid-row: 2;
  }

  .grid-gotaproject {
    grid-column: 2/12;
    grid-row: 2;
  }
  

  .letstalk {
    color: #0300c7;
    font-family: 'Panchang', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    margin-top: 19vh;
    margin-left: 1vw;

  }


}
</style>