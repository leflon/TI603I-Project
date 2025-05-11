<template>
  <main>
    <h1>Categories</h1>

    <div v-if="categories.length === 0">No categories found.</div>

    <div v-for="category in categories" :key="category" class="category-section">
      <hr>
      <h3>{{ category }}</h3>
      <div class="gamecards">
        <Gamecard
          v-for="product in getProductsByCategory(category)"
          :key="product.id"
          :title="product.name"
          :price="product.price"
          :image="product.imageUrl"
          :labels="[product.category]"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Gamecard from '@/components/Gamecard.vue';


const categories = ref([]);
const products = ref([]);


onMounted(async () => {
  try {
    const categoriesResponse = await fetch('http://localhost:3000/api/products/categories');
    const categoriesData = await categoriesResponse.json();
    categories.value = categoriesData.categories;


  } catch (error) {
    console.error('Error fetching categories or products:', error);
  }
});


const getProductsByCategory = (category) => {
  return products.value.filter((product) => product.category === category);
};
</script>

<style scoped>
.category-section {
  margin-bottom: 30px;
}

.category-section h3 {
  font-size: 1.8rem;
  color: #ff4683;
  margin-bottom: 10px;
}

.gamecards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}

.gamecards .gamecard {
  width: 30%;
}
</style>
