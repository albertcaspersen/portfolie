<template>
  <nav class="grid-navbar-nav">
    <router-link to="/about" class="nav-link">About</router-link>
    <router-link to="/projects" class="nav-link">Projects</router-link>
    <router-link to="/contact" class="nav-link">Contact</router-link>
  </nav>
</template>

<script setup>
/* Hvis du har brug for noget JavaScript til navigationen, kan du tilføje det her. */
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #0300c7;
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
  /* Navbar takes columns 9 to 12 */
  grid-row: 1;
  display: flex;
  align-items: center;
  position: relative;

}

.router-link-active {
  text-decoration: underline;
}
</style>