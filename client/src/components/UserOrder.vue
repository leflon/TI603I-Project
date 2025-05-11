<template>
  <div class="order-detail">
    <h3>Order #{{ order.orderId }}</h3>
    <p><strong>Status:</strong> {{ order.status }}</p>
    <p><strong>Date:</strong> {{ order.date }}</p>
    <ul id="items">
      <li v-for="item in order.items" :key="item.id">
        <strong>{{ item.name }}</strong> - ${{ item.price }} 
        <strong>x{{item.quantity }}</strong>
      </li>
    </ul>
    <p><strong>Total:</strong> ${{ order.total }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  order: Object
});
</script>

<style scoped>
.order-detail {
  padding: 20px;
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); 
  margin-bottom: 20px;
  max-width: 300px;
}

.order-detail h3 {
  font-size: 1.5rem;
  color: #ff4683;
  margin-bottom: 10px;
}

.order-detail p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.order-detail strong {
  font-weight: 600; 
}

.order-detail ul {
  padding-left: 20px;
  margin-top: 10px;
}

.order-detail li {
  font-size: 1rem;
  color: #666;
  margin-bottom: 8px;
}

.order-detail .total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 15px;
}

.order-detail .order-item-quantity {
  color: #999;
  font-weight: normal;
}
#items{
  background-color: rgba(44, 43, 45, 0.077);
  border-radius: 10px;
  padding : 5px;
   list-style-type: none;
}
</style>

