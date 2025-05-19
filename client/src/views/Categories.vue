<script setup>
import Gamecat from '@/components/Gamecat.vue';
import {onMounted, ref} from 'vue';
import call from '@/lib/api';


const categories = ref([]);

onMounted(async () => {
  const res = await call('/api/products/categories');
  if (res.success) {
    categories.value = res.categories;
  } else {
    alert(res.message);
  }
});

</script>
<template>
  <h1>Categories</h1>
  <div class="categories">
    <Gamecat v-for="category in categories" :key="category.id" :name="category" />
  </div>
</template>

<style scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>