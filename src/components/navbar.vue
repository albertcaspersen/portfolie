<script setup>
// 1. Importer den centrale tema-tilstand
import { isDarkMode } from '../themeState.js';
</script>

<template>
  <!-- 2. Tilføj en dynamisk klassebinding til container-elementet -->
  <nav class="grid-navbar-nav" :class="{ 'dark-mode': isDarkMode }">
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/projects" class="nav-link">Projects</router-link>
    <router-link to="/contact" class="nav-link">Contact</router-link>
  </nav>
</template>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #0300c7; /* Standard farve: Blå */
  font-family: 'Panchang-Regular', 'Arial', sans-serif;
  font-size: 1.2rem;
  transition: color 0.4s;
  margin-right: 5em;
  z-index: 3;
  font-weight: 600;
}

.nav-link:hover {
  text-decoration: underline;
}

.grid-navbar-nav {
  grid-column: 9 / 13;
  grid-row: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.router-link-active {
  text-decoration: underline;
}

/* 3. Definer stilen for dark mode */
.grid-navbar-nav.dark-mode .nav-link {
  color: #FFFFFF; /* Hvid tekst, når dark-mode er aktiv */
}


@media (max-width: 600px) {
  .grid-navbar-nav {
    flex-direction: column;
    align-items: end;
    position: absolute; /* Behøver måske ikke at være absolute længere? */
    top: 1.4vh;          /* Prøv med en fast værdi */
    right: -1.7vw;         /* Prøv med en fast værdi */
    grid-column: 9 / 13; /* Spænder over de sidste kolonner */
    grid-row: 1;
    
  }
  .nav-link {
    text-decoration: none;
    color: #0300c7; /* Standard farve: Blå */
    font-family: 'Panchang-Regular', 'Arial', sans-serif;
    font-size: 1rem;
    transition: color 0.4s;
    margin-right: 20%;
    z-index: 3;
    font-weight: 600;
  }
}


</style>