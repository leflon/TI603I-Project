<template>
    <div>
      <div class="carousel-wrapper">
        <div class="carousel">
          <div
            class="carousel-slide"
            @mouseover="hovered = true"
            @mouseleave="hovered = false"
            :style="{ backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent), url(' + images[currentIndex].url + ')' }"
          >
            <div class="title-overlay" v-show="hovered">
              {{ images[currentIndex].title }}
            </div>
            <button class="nav left" @click="prevSlide">‹</button>
            <button class="nav right" @click="nextSlide">›</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
  
<script setup>
    import { ref } from 'vue';

    const images = [
    { url: '../../public/img/Jumanji.png', title: 'Jumanji' },
    { url: '../../public/img/Dobble.jpg', title: 'Dobble' },
    { url: '../../public/img/Monopoly.png', title: 'Monopoly' },
    ];

    const currentIndex = ref(0);
    const hovered = ref(false);

    const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
    };

    const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
    };

</script>
  
<style scoped>
.carousel-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.carousel {
  width: 600px;
  max-width: 1000px;
  height: 400px;
  overflow: hidden;
  border-radius: 15px;
  position: relative;
  margin: 20px 0;
}

  .carousel-slide {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: background-image 0.6s ease-in-out;
    position: relative;
  }
  
  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
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
  