<template>
  <div>
    <h2>Our bestsellers</h2>
    <Carrousel v-if='bestsellers.length' :products="bestsellers" />
    <p v-else>Loading carrousel...</p>

    <h2>Browse by categories</h2>
    <div class="gamecats">
      <Gamecat v-for='category of categories' :name='category' />
    </div>

    <h2>Less than €20</h2>
    <div class="gamecards">
      <Gamecard v-for="product in lessThan" :key="product.id" :title="product.name" :price="product.price"
        :image="product.imageUrl" :labels="product.category ? [product.category] : []" />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

import Gamecard from '../components/Gamecard.vue';
import Carrousel from '../components/Carrousel.vue';
import Gamecat from '../components/Gamecat.vue';

const bestsellers = ref([]);
const lessThan = ref([]);
const categories = ref([]);

onMounted(async () => {
  try {
    // Best sellers
    let res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/bestsellers`);
    res = await res.json();
    bestsellers.value = res.bestsellers;
    // Categories
    res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/categories?limit=5`);
    res = await res.json();
    categories.value = res.categories;
    // Less-than X products
    res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/search?maxPrice=20&limit=3`);
    res = await res.json();
    lessThan.value = res.products;
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
  justify-content: center;
  gap: 20px;
}
</style>
