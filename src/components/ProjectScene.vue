<script setup>
import { shallowRef, ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'

// --- KAMERASTYRING ---
const cameraRef = shallowRef(null)
const mouseX = ref(0)
const mouseY = ref(0)
const sceneCenter = new THREE.Vector3(0, 2.5, 0)

const normalizedMouseX = computed(() => {
  if (typeof window === 'undefined') return 0;
  return (mouseX.value / window.innerWidth) * 2 - 1
})

const normalizedMouseY = computed(() => {
  if (typeof window === 'undefined') return 0;
  return (mouseY.value / window.innerHeight) * 2 - 1
})

function handleMouseMove(event) {
  mouseX.value = event.clientX
  mouseY.value = event.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.body.style.cursor = 'auto'
})

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (cameraRef.value) {
    const panFactorX = 4
    const panFactorY = 0.2
    const targetX = -normalizedMouseX.value * panFactorX
    const targetY = sceneCenter.y + normalizedMouseY.value * panFactorY // Inverteret
    const targetPosition = new THREE.Vector3(targetX, targetY, 1)
    cameraRef.value.position.lerp(targetPosition, 0.05)
    cameraRef.value.lookAt(sceneCenter)
  }
})

// --- PROJEKT-LOGIK ---
const props = defineProps({
  projects: Array,
  isGloballyMuted: Boolean // Modtager den globale mute state
})
const emit = defineEmits(['project-focus', 'project-click'])
const videoElements = ref({});
let currentlyPlayingVideo = null;

const getPosition = (index, total) => {
  const angle = total <= 1 ? 0 : (index / (total - 1) - 0.5) * Math.PI * 0.8;
  const radius = 13;
  return [-Math.sin(angle) * radius, sceneCenter.y, -Math.cos(angle) * radius];
}

const projectMaterials = shallowRef([])
const projectDimensions = ref([])
const textureLoader = new THREE.TextureLoader()

function getNormalizedDimensions(width, height) {
  const maxDimension = 6;
  if (!width || !height) return [2.4, 1.5];
  const aspectRatio = width / height;
  return width >= height ? [maxDimension, maxDimension / aspectRatio] : [maxDimension * aspectRatio, maxDimension];
}

async function loadProject(project) {
    return new Promise(async (resolve, reject) => {
        try {
            if (project.mediaType === 'image') {
                const texture = await textureLoader.loadAsync(project.media);
                texture.colorSpace = THREE.SRGBColorSpace;
                const material = new THREE.MeshBasicMaterial({ map: texture });
                const dimensions = getNormalizedDimensions(texture.image.naturalWidth, texture.image.naturalHeight);
                resolve({ material, dimensions });

            } else if (project.mediaType === 'video') {
                const video = document.createElement('video');
                video.src = project.media;
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.muted = true; // Start altid mutet
                video.playsInline = true;
                videoElements.value[project.id] = video;

                video.onloadedmetadata = () => {
                    const videoTexture = new THREE.VideoTexture(video);
                    if (project.id === 5) {
                        videoTexture.colorSpace = THREE.SRGBColorSpace;
                    }
                    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
                    const dimensions = getNormalizedDimensions(video.videoWidth, video.videoHeight);
                    resolve({ material, dimensions });
                };
                video.onerror = () => reject(new Error(`Kunne ikke indlæse video: ${project.media}`));
            }
        } catch (e) {
            reject(e);
        }
    });
}

const loadAllProjects = async () => {
  if (!props.projects || props.projects.length === 0) return;
  try {
    const promises = props.projects.map(p => loadProject(p).catch(error => {
        console.error(`Fejl ved indlæsning af projekt ID ${p.id}:`, error);
        return { material: new THREE.MeshBasicMaterial({ color: 'red' }), dimensions: [2.4, 1.5] };
    }));
    const results = await Promise.all(promises);
    projectMaterials.value = results.map(r => r.material);
    projectDimensions.value = results.map(r => r.dimensions);
  } catch (error) {
    console.error("Kritisk fejl under indlæsning:", error);
  }
};

// --- EVENT HANDLERS (OPDATERET) ---
function handleProjectFocus(project) {
  document.body.style.cursor = 'pointer'
  const videoToPlay = videoElements.value[project.id];

  if (currentlyPlayingVideo === videoToPlay) {
    emit('project-focus', project);
    return;
  }

  // Stop den forrige video
  if (currentlyPlayingVideo) {
    currentlyPlayingVideo.pause();
  }

  // Start den nye video
  if (videoToPlay) {
    videoToPlay.play().catch(e => console.error("Fejl ved afspilning af video:", e));
    // Sæt videoens 'muted' til at matche den globale state
    videoToPlay.muted = props.isGloballyMuted;
    currentlyPlayingVideo = videoToPlay;
  } else {
    currentlyPlayingVideo = null;
  }

  emit('project-focus', project);
}

function handleProjectLeave() {
  document.body.style.cursor = 'auto'
  // Videoen fortsætter med at spille, som ønsket
}

function handleProjectClick(project) {
  // Lydlogikken er fjernet. Den styrer kun navigation.
  emit('project-click', project);
}

// Watcher der reagerer på klik på lyd-knappen
watch(() => props.isGloballyMuted, (newMutedState) => {
  if (currentlyPlayingVideo) {
    // Opdater den nuværende videos lyd med det samme
    currentlyPlayingVideo.muted = newMutedState;
  }
});

watch(() => props.projects, loadAllProjects, { immediate: true, deep: true });
</script>

<template>
  <TresCanvas
    window-size
    alpha
    :output-color-space="THREE.SRGBColorSpace"
  >
    <TresPerspectiveCamera
      ref="cameraRef"
      :position="[0, sceneCenter.y, 7]"
      :fov="25"
    />

    <TresAmbientLight :intensity="1.5" />
    <TresDirectionalLight :position="[3, 3, 5]" :intensity="2.5" />

    <TresGroup v-for="(project, i) in projects" :key="project.id">
      <TresMesh
        :position="getPosition(i, projects.length)"
        @click="() => handleProjectClick(project)"
        @pointer-enter="() => handleProjectFocus(project)"
        @pointer-leave="() => handleProjectLeave(project)"
        :look-at="sceneCenter"
      >
        <TresPlaneGeometry v-if="projectDimensions[i]" :args="projectDimensions[i]" />
        <primitive v-if="projectMaterials[i]" :object="projectMaterials[i]" />
      </TresMesh>
    </TresGroup>
  </TresCanvas>
</template>