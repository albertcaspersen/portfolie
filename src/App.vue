<template>
  <div id="p5-background"></div>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let p5Instance = null

onMounted(() => {
  const sketch = (p) => {
    let particles = []
    const numParticles = 80;

    class Particle {
      constructor() {
        this.pos = p.createVector(p.random(p.width), p.random(p.height))
        this.vel = p.createVector(0, 0)
        this.noiseOffset = p.random(10000)
        this.speed = 2
        this.size = p.random(1, 3)
      }

      update() {
        const angle = p.noise(this.pos.x * 0.002, this.pos.y * 0.002, this.noiseOffset) * p.TWO_PI * 4
        this.vel.x = p.cos(angle)
        this.vel.y = p.sin(angle)
        // Bemærk: 'p5' her refererer til det globale p5-objekt.
        this.pos.add(window.p5.Vector.mult(this.vel, this.speed))
        this.wrapAround()
      }

      // RETTET: Denne funktion matcher nu Processing's logik for at "wrappe" rundt om kanterne.
      wrapAround() {
        if (this.pos.x < 0) this.pos.x = p.width
        if (this.pos.x > p.width) this.pos.x = 0
        if (this.pos.y < 0) this.pos.y = p.height
        if (this.pos.y > p.height) this.pos.y = 0
      }

      // RETTET: Denne funktion tegner en fyldt ellipse, præcis som i din Processing sketch.
      display() {
        p.noStroke()
        p.fill(3,7,101) // Hvid farve med alpha-værdi, som i Processing.
        p.ellipse(this.pos.x, this.pos.y, this.size, this.size)
      }
    }

    p.setup = () => {
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight)
      canvas.parent('p5-background')
      canvas.style('z-index', '0')
      canvas.style('position', 'fixed')
      p.smooth(8)
      for (let i = 0; i < numParticles; i++) {
        particles[i] = new Particle()
      }
      // Sæt baggrundsfarven én gang for at starte med et rent lærred.
      p.background(236, 236, 236)
    }

    p.draw = () => {
      // RETTET: Brug af en semi-transparent firkant skaber den ønskede "fade"-effekt,
      // som efterligner din Processing-sketchs opførsel.
      p.noStroke()
      p.fill(236, 236, 236, 7)
      p.rect(0, 0, p.width, p.height)

      for (let particle of particles) {
        particle.update()
        particle.display()
      }
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
  }

  // GENDANNET: Bruger din oprindelige metode til at instantiere p5,
  // da dette forventer, at p5 er indlæst globalt (f.eks. via et script-tag).
  p5Instance = new window.p5(sketch)
})

onUnmounted(() => {
  if (p5Instance) {
    p5Instance.remove()
  }
})
</script>

<style>
/* Dine originale styles. `position: absolute` er gendannet. */
html, body {
  margin: 0;
  padding: 0;
  background-color: #111;
}

#p5-background {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: -2;
  overflow: hidden; /* 'none' er ikke en gyldig værdi, 'hidden' er korrekt */
}

#app > * {
  position: absolute;
  z-index: 1;
}
</style>