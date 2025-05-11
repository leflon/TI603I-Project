<template>
  <div>
    <h2>Your Orders</h2>
    <div v-if="orders.length === 0">No orders found.</div>
    <div v-else class="orders-container">
      <UserOrder v-for="order in orders" :key="order.orderId" :order="order" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserOrder from '@/components/UserOrder.vue';

const orders = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders.');
    }
    const data = await response.json();
    orders.value = data.orders;
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
