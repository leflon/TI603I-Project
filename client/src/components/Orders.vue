<template>
  <div>
    <h2>Your Orders</h2>
    <div v-if="orders.length === 0">No orders found.</div>
    <div v-else class="orders-container">
      <UserOrders v-for="order in orders" :key="order.orderId" :order="order" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserOrders from '@/components/UserOrders.vue';
import {store} from '@/lib/store';

const orders = ref([]);

onMounted(async () => {
  try {
    const data = store.orders; 
    orders.value = data; 

  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});
</script>

<style scoped>
.orders-container {
  display: flex; 
  overflow-x: auto; 
  gap: 20px; 
  padding: 10px 0; 
}

.orders-container::-webkit-scrollbar {
  height: 8px; 
}

.orders-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.orders-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>