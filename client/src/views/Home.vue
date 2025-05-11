<template>
  <div>
    <h2>Our bestsellers</h2>
    <Carrousel v-if="bestsellerImages.length > 0" :images="bestsellerImages" />
    <p v-else>Loading carrousel...</p>

    <h2>Browse by categories</h2>
    <div class="gamecats">
      <Gamecat />
      <Gamecat />
      <Gamecat />
      <Gamecat />
      <Gamecat />
    </div>

    <h2>Less than 40 €</h2>
    <div class="gamecards">
      <Gamecard v-for="product in products.filter(p => p.price < 40)" :key="product.id" :title="product.name"
        :price="product.price" :image="product.imageUrl" :labels="product.category ? [product.category] : []" />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

import Gamecard from '../components/Gamecard.vue';
import Carrousel from '../components/Carrousel.vue';
import Gamecat from '../components/Gamecat.vue';

const products = ref([]);
const bestsellerImages = ref([]);

onMounted(async () => {
  try {
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/bestsellers`);
    res = await res.json();
    products.value = res.bestsellers;
    bestsellerImages.value = products.value.map(product => ({
      imageUrl: product.imageUrl,
      name: product.name
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>

<style scoped>
.gamecats {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px 0;
}

.gamecards {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px;
}
</style>
