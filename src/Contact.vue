<script setup>
import Navbar from './components/navbar.vue'
import Designstud from './components/Designstud.vue'
</script>

<template>
  <div class="grid-container">
    <Navbar />
    <Designstud />

    <h1 class="grid-item grid-talktext letstalk">
      Collaboration fuels my creativity – I love joining forces to turn bold ideas into reality. If you’re ready to build something exciting together, let’s connect. I’m currently looking for an internship this fall 2025.
    </h1>
    <p class="grid-item grid-gotaproject projecttekst">Got a project in mind?</p>

    <h2 class="grid-item grid-infotekst info">
      <span style="font-weight: 700;">Mail</span><br>
       <a href="mailto:albertcaspersen@hotmail.com" style="text-decoration: none; color: #0300c7;">albertcaspersen@hotmail.com</a><br><br>

      <span style="font-weight: 700;">Socials</span><br>
      <a href="https://www.instagram.com/albert_caspersen/" style="text-decoration: none; color: #0300c7;">Instagram</a><br>
      <a href="https://www.facebook.com/albert.caspersen?locale=da_DK" style="text-decoration: none; color: #0300c7;">Facebook</a><br><br>

      <span style="font-weight: 700;">Phone</span><br>
      +45 50557144
    </h2>
  </div>
</template>

<style scoped>
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

@media (max-width: 600px) {
  .info {
    font-size: 0.9rem;
    margin-top: 10vh;
    text-align: right; /* bevarer højrejustering på små skærme */
    
  }


  .grid-infotekst {
    grid-column: 1/13; /* fylder hele bredden på mobil */
    justify-self: end;
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
