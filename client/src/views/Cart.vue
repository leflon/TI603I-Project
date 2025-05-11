<template>
  <main>
    <h2>Your Cart</h2>
    <div v-if="cartItems.length === 0">Your cart is empty.</div>
    <div v-else>
      <div class="cart-items">
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :id="item.id"
          :name="item.name"
          :price="item.price"
          :imageUrl="item.imageUrl"
          :quantity="item.quantity"
        />
      </div>

      <div class="cart-total">
        <h3>Total: {{ totalPrice }} €</h3>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CartItem from '../components/CartItem.vue';

const cartItems = ref([]);


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/cart');
    if (!response.ok) {
      throw new Error('Failed to fetch cart items.');
    }
    const data = await response.json();
    cartItems.value = data.cart;
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
});


const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
});
</script>

<style scoped>
.cart-items {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.cart-total {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}
</style>
