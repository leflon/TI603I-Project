<template>
  <main>
    <h2>Your Wishlist</h2>
    <div v-if="wishlist.length === 0">
      <p>Your wishlist is empty</p>
    </div>
    <div v-else class="gamecards">
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
import {store} from '@/lib/store';

const wishlist = ref([]);
const errorMessage = ref('');

onMounted(async () => {
  try {
    const data = store.wishlist; 
    wishlist.value = data; 
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    errorMessage.value = 'Failed to load your wishlist. Please try again later.';
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