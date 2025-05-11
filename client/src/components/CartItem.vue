<template>
  <div class="cart-item">
    <img :src="image" alt="Product Image" class="cart-item-image" />
    <div class="cart-item-details">
      <h3 class="cart-item-title">{{ name }}</h3>
      <p class="cart-item-price">{{ price }} €</p>
      <p>x{{ quantity }}</p>
    </div>
    
    <button @click="removeFromCart" class="remove-button">Remove</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  imageUrl: String,
  quantity: Number
});

const removeFromCart = () => {
  // should remove item from cart
  console.log(`Removing item with ID: ${props.id}`);
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}

.cart-item-image {
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-details {
  flex-grow: 1;
  margin-left: 10px;
}

.cart-item-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.cart-item-price {
  font-size: 1rem;
  color: #666;
}

.remove-button {
  background-color: #ff4683;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #d03f6b;
}
</style>
