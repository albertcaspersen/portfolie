<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import Navbar from './components/navbar.vue'
import Designstud from './components/Designstud.vue'
import { hasAnimatedAbout } from './animationState'

function playAnimation() {
    const startTekstEl = document.querySelector('.startTekst')
    const albertEl = document.querySelector('.Albert')
    const valdemarEl = document.querySelector('.Valdemar')
    const infoEl = document.querySelector('.info')

    const fullText = 'Hello World!'
    const finalText = 'Albert Valdemar'
    const infoText = 'I am working on creating user-friendly and aesthetic digital solutions. Check out my projects and feel free to contact me!'

    if (startTekstEl) startTekstEl.textContent = ''
    if (albertEl) {
        albertEl.textContent = ''
        gsap.set(albertEl, { opacity: 0 })
    }
    if (valdemarEl) {
        valdemarEl.textContent = ''
        gsap.set(valdemarEl, { opacity: 0 })
    }
    if (infoEl) {
        infoEl.textContent = ''
        gsap.set(infoEl, { opacity: 0 })
    }

    const bogstavTimeline = gsap.timeline()

    bogstavTimeline
        .to('.bogstav', {
            rotation: 630,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.bogstav-a', {
            y: -400,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.bogstav-v', {
            y: 400,
            duration: 1,
            ease: 'power3.out'
        }, '-=1')
        .add(() => {
            let i = 0
            const speed = 80

            if (startTekstEl) {
                gsap.to(startTekstEl, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                })

                function typeWriter() {
                    if (i < fullText.length) {
                        startTekstEl.textContent += fullText.charAt(i)
                        i++
                        setTimeout(typeWriter, speed)
                    } else {
                        gsap.to(startTekstEl, {
                            opacity: 0,
                            duration: 1,
                            ease: 'power2.out'
                        })

                        gsap.to('.bogstav-a', {
                            y: 25,
                            duration: 1,
                            ease: 'power2.out'
                        })

                        gsap.to('.bogstav-v', {
                            y: -48,
                            duration: 1,
                            ease: 'power2.out'
                        })

                        gsap.to('.bogstav', {
                            rotation: '+=90',
                            duration: 1,
                            delay: 1,
                            ease: 'power3.out'
                        })

                        gsap.to('.bogstav', {
                            x: -726,
                            duration: 1,
                            delay: 1,
                            ease: 'power3.out',
                            onComplete: () => {
                                let j = 0
                                const speed2 = 80

                                gsap.to([albertEl, valdemarEl], {
                                    opacity: 1,
                                    duration: 0.5,
                                    ease: 'power2.out',
                                    onStart: () => {
                                        if (albertEl) albertEl.textContent = ''
                                        if (valdemarEl) valdemarEl.textContent = ''
                                    },
                                    onComplete: () => {
                                        function typeWriterFinal() {
                                            if (j < finalText.length) {
                                                const char = finalText.charAt(j)

                                                if (j < 6 && albertEl) {
                                                    albertEl.textContent += char
                                                } else if (valdemarEl) {
                                                    valdemarEl.textContent += char
                                                }

                                                j++
                                                setTimeout(typeWriterFinal, speed2)
                                            } else {
                                                const pilEl = document.querySelector('.grid-pil img')
                                                if (pilEl) {
                                                    gsap.to(pilEl, {
                                                        opacity: 1,
                                                        duration: 0.5,
                                                        ease: 'power2.out',
                                                        onComplete: () => {
                                                            gsap.to(pilEl, {
                                                                y: -20,
                                                                duration: 0.5,
                                                                yoyo: true,
                                                                repeat: -1,
                                                                ease: 'power2.inOut',
                                                                repeatDelay: 1.0
                                                            })
                                                        }
                                                    })
                                                }

                                                gsap.to('.bogstav', {
                                                    opacity: 0,
                                                    duration: 0.5,
                                                    ease: 'power2.out',
                                                    onComplete: () => {
                                                        const bogstavEl = document.querySelector('.bogstav')
                                                        if (bogstavEl) bogstavEl.style.display = 'none'

                                                        let k = 0
                                                        const speed3 = 35

                                                        if (infoEl) {
                                                            infoEl.textContent = ''
                                                            gsap.to(infoEl, {
                                                                opacity: 1,
                                                                duration: 0.5,
                                                                ease: 'power2.out',
                                                                onComplete: () => {
                                                                    function typeWriterInfo() {
                                                                        if (k < infoText.length) {
                                                                            infoEl.textContent += infoText.charAt(k)
                                                                            k++
                                                                            setTimeout(typeWriterInfo, speed3)
                                                                        }
                                                                    }
                                                                    typeWriterInfo()

                                                                    gsap.to(['.migPic', '.beskrivelse'], {
                                                                        opacity: 1,
                                                                        duration: 0.4,
                                                                        delay: 1,
                                                                        ease: 'power2.out'
                                                                    })
                                                                }
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }

                                        typeWriterFinal()
                                    }
                                })
                            }
                        })
                    }
                }

                typeWriter()
            }
        })
}

onMounted(() => {
    if (!hasAnimatedAbout.value) {
        playAnimation()
        hasAnimatedAbout.value = true
    } else {
        const bogstavEl = document.querySelector('.bogstav')
        const albertEl = document.querySelector('.Albert')
        const valdemarEl = document.querySelector('.Valdemar')
        const startTekstEl = document.querySelector('.startTekst')
        const infoEl = document.querySelector('.info')
        const pilEl = document.querySelector('.grid-pil img')
        const migPicEl = document.querySelector('.migPic')
        const beskrivelseEl = document.querySelector('.beskrivelse')

        if (bogstavEl) {
            bogstavEl.style.display = 'none'
            gsap.set(bogstavEl, { opacity: 0 })
        }

        if (albertEl) gsap.set(albertEl, { opacity: 1 })
        if (valdemarEl) gsap.set(valdemarEl, { opacity: 1 })
        if (startTekstEl) gsap.set(startTekstEl, { opacity: 0 })
        if (infoEl) gsap.set(infoEl, { opacity: 1 })
        if (migPicEl) gsap.set(migPicEl, { opacity: 1 })
        if (beskrivelseEl) gsap.set(beskrivelseEl, { opacity: 1 })

        if (pilEl) {
            gsap.set(pilEl, { opacity: 1 })
            gsap.to(pilEl, {
                y: -20,
                duration: 0.5,
                yoyo: true,
                repeat: -1,
                ease: 'power2.inOut',
                repeatDelay: 1.0
            })
        }
    }

    // 🔽 Scroll til bund ved klik på pil - KORRIGERET KODE 🔽
    const pilEl = document.querySelector('.grid-pil img');
    if (pilEl) {
        pilEl.addEventListener('click', (event) => {
            // Forhindrer enhver mærkelig standard-opførsel
            event.preventDefault();

            // Rul til bunden af HELE dokumentet
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
});
</script>

<template>
    <h1 class="bogstav">
        <span class="bogstav-a">A</span><br />
        <span class="bogstav-v">V</span>
    </h1>

    <div class="startTekst" style="opacity: 0;"></div>
    <div class="slutTekst" style="opacity: 0;"></div>

    <div class="grid-container">
        <Navbar />
        <Designstud />
        <div class="grid-item grid-albert">
            <h1 class="Albert">Albert</h1>
        </div>

        <div class="grid-item grid-infoTekst">
            <h2 class="info">I am working on creating user-friendly and aesthetic digital solutions. Check out my
                projects and feel free to contact me!</h2>
        </div>

        <div class="grid-item grid-valdemar">
            <h1 class="Valdemar">Valdemar</h1>
        </div>

        <div class="grid-item grid-migPic">
            <img class="migPic" src="./assets/billeder/mighehe2.jpg" style="height: 60vh; margin-top: 21vh;">
        </div>

        <div class="grid-item grid-pil">
            <img ref="scrollArrow" src="./assets/billeder/arrow-top-right.png"
                 style="transform: rotate(135deg); position:absolute; height: 6vh;margin-top: 11.5vh; right: 2vw; cursor: pointer">
          </div>
          


        <div class="grid-item grid-beskrivelse beskrivelse">
            <div class="omMig">Hello! <br> I’m a Coded Design student at the Danish school of media and journalism.
            </div>
            <div class="omMig2">
                My work explores the space between simplicity and complexity — creating designs that are both engaging and intuitive. I enjoy pushing myself with technically advanced features like playful animations and Three.js, always with a focus on maintaining clarity and ease of use.
                My goal is to build things that are fun to use — and just as enjoyable to make.
            </div>
        </div>
        <div class="grid-item grid-explorebox">
            <div class="explore">Take a look at my work <a href="#">here!</a></div>
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto auto auto auto;
    /* 4 rækker */
    gap: 20px;
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;
    /* Fjernede overflow: hidden herfra for at lade body styre scrolling */
}

.grid-albert {
    grid-column: 1 / 5;
    grid-row: 3;
}

.grid-valdemar {
    grid-column: 1 / 5;
    grid-row: 4;
}

.grid-migPic {
    grid-column: 9 / 13;
    grid-row: 5;
}



.grid-beskrivelse {
    grid-column: 2 / 8;
    grid-row: 5;
}

.grid-explorebox {
    grid-column: 10 / 13;
    grid-row: 6;
}


.grid-pil {
    grid-column: 12 / 13;
    grid-row: 4;

}

.grid-pil img {
    opacity: 0;
    transition: opacity 0.5s ease;
}

.grid-infoTekst {
    grid-column: 11 / 13;
    grid-row: 3;
}

/* === KORRIGERET SEKTION START === */
html,
body {
    margin: 0;
    padding: 0;
    width: 100vw;
    overflow-x: hidden; /* Forhindrer horisontal scroll */
    /* Fjernede 'overflow-y: hidden !important;' for at tillade vertikal scroll */
}

/* Skjul scrollbaren, men tillad scroll */
body {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}

body::-webkit-scrollbar {
    display: none; /* Skjuler scrollbaren for webkit-browsere */
}
/* === KORRIGERET SEKTION SLUT === */


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

.forsidepic {
    height: 60vh;
    width: auto;
    padding-top: 6vh;
    opacity: 0;
    /* Start skjult */
    transition: opacity 0.5s ease;
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
    /* eller hvad du nu synes */
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
</style>