<template>
  <div class="carousel" v-if="products.length > 0">
    <div class="carousel-slide" @click="navigate" @mouseenter="hovered = true" @mouseleave="hovered = false">
      <img :src="products[currentIndex].imageUrl" alt="carousel image" />
      <div class="title-overlay">
        {{ products[currentIndex].name }}
      </div>
      <button class="nav left" @click.stop="prevSlide">‹</button>
      <button class="nav right" @click.stop="nextSlide">›</button>
    </div>
  </div>
</template>


<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
});

const currentIndex = ref(0);
const hovered = ref(false);
let interval = null;

const navigate = () => {
  const product = props.products[currentIndex.value];
  router.push('/product/' + product.id);
};

const nextSlide = (e) => {
  e.stopPropagation();
  currentIndex.value = (currentIndex.value + 1) % props.products.length;
};

const prevSlide = (e) => {
  e.stopPropagation();
  currentIndex.value = (currentIndex.value - 1 + props.products.length) % props.products.length;
};

onMounted(() => {
  interval = setInterval(() => {
    if (!hovered.value) nextSlide();
  }, 5000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.carousel-slide {
  width: 400px;
  max-height: 500px;
  position: relative;
  overflow: hidden;
  position: relative;
  margin: 20px auto;
  cursor: pointer;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: contain; 
  background-position: center;
  display: block;
  transition: opacity 0.6s ease-in-out;
  border-radius: 15px;

}
.carousel-slide {
  width: 100%;
}

.nav {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  z-index: 1;
  transition: background-color 0.3s ease;
}

.nav:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.nav.left {
  left: 15px;
}

.nav.right {
  right: 15px;
}

.title-overlay {
  position: absolute;
  bottom: 20px;
  left: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
</style>
