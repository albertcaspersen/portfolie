
<script setup>
import Navbar from './components/navbar.vue'
import Designstud from './components/Designstud.vue'
</script>



<template>
  <div class="grid-container">
    <Navbar />
    <Designstud />

    <h1 class="grid-item grid-talktext letstalk">
      Lets create together!
    </h1>
    <p class="grid-item grid-gotaproject projecttekst">Got a project in mind?</p>

    <h2 class="grid-item grid-infotekst info">
      <span style="font-weight: 700;">Mail</span><br>
       <a href="mailto:albertcaspersen@hotmail.com" style="text-decoration: none; color: #0300c7; ">albertcaspersen@hotmail.com</a><br><br>

      <span style="font-weight: 700;">Socials</span><br>
      <a href="https://www.instagram.com/albert_caspersen/" style="text-decoration: none; color: #0300c7; ">Instagram</a><br>
      <a href="https://www.facebook.com/albert.caspersen?locale=da_DK" style="text-decoration: none; color: #0300c7;">Facebook</a><br><br>

      <span style="font-weight: 700;">Phone</span><br>
      50557144
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
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    overflow-y: visible;
  }

.letstalk {
  color: #0300c7;
  font-family: 'Panchang-Regular', 'Arial', sans-serif;
  font-weight: 600;
  font-size: 4rem;
  margin-top: 30vh;
  margin-left: 1vw;

}

.grid-talktext {
  grid-column: 1/12;
  grid-row: 4;
}

.grid-gotaproject {
  grid-column: 1/12;
  grid-row: 4;
}

.projecttekst {
  font-family: 'Panchang-Regular', 'Arial', sans-serif;
  color: #0300c7;
  margin-top: 28vh;
  margin-left: 1vw;
  font-size: 1.3rem;
}

.info {
  color: #0300c7;
  font-family: 'Panchang-Regular', 'Arial', sans-serif;
  font-size: 1rem;
  margin-top: 15vh;
  font-weight: 200;
}

.grid-infotekst {
  grid-column: 9/12;
  grid-row: 3;
}

</style>
  