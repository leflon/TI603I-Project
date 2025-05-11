<template>
  <main>
    <h2>Wishlist</h2>
    <div class="gamecards">
      <Gamecard 
        v-for="(item, index) in wishlist" 
        :key="item.id"
        :title="item.name" 
        :price="item.price" 
        :image="item.imageUrl" 
        :labels="['Wishlist']" />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Gamecard from './Gamecard.vue';

const wishlist = ref([]);

// Fetch wishlist data from the API when the component is mounted
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/wishlist');
    if (!response.ok) {
      throw new Error('Failed to fetch wishlist.');
    }
    const data = await response.json();
    wishlist.value = data.wishlist;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
  }
});
</script>

<style scoped>
.gamecards {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: auto;
  margin: 0 10%;
  margin: 20px 0;
}
</style>
