<script setup>
// 1. Importer den centrale tema-tilstand
import { isDarkMode } from '../themeState.js';
</script>

<template>
  <!-- 2. Tilføj en dynamisk klassebinding til container-elementet -->
  <div class="grid-item grid-nav" :class="{ 'dark-mode': isDarkMode }" style="top: 1vh; position: relative">
    <strong>Coded design</strong>  <br> student
  </div>
</template>

<style scoped>
.grid-DesignStud {
    grid-column: 1 / 5;
    grid-row: 3;
  }

.grid-nav {
    position: static;
    background-color: transparent;
    border: solid 3px transparent;
    color: #0300c7; /* Standard farve: Blå */
    height: 8vh;
    padding-left: 1vw;
    font-family: 'Panchang', 'Arial', sans-serif;
    font-size: 1.75rem;
    margin-top: -3px;
    margin-left: -3px;
    grid-column: 1 / 5;
    grid-row: 1;
    transition: color 0.4s; /* Tilføjet for en blød overgang */
}

/* 3. Definer stilen for dark mode */
.grid-nav.dark-mode {
  color: #FFFFFF; /* Hvid tekst, når dark-mode er aktiv */
}


@media (max-width: 600px) {
  .grid-nav {
    position: static;
    background-color: transparent;
    border: solid 3px transparent;
    color: #0300c7; /* Standard farve: Blå */
    height: 8vh;
    padding-left: 5%;
    /*font-family: 'Panchang-Regular', 'Arial', sans-serif;*/
    font-family: 'Panchang', 'Arial', sans-serif;
    font-size: 0.91rem;
    margin-top: -3px;
    margin-left: -3px;
    grid-column: 1 / 8;
    grid-row: 1;
    transition: color 0.4s; /* Tilføjet for en blød overgang */
}

}



</style>