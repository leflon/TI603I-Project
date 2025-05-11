<template>
  <main>
    <div v-if="loading">Loading...</div>
    <div v-else-if="product" class="product-details">
      <div class="product-header">
        <img :src="product.imageUrl" alt="Product Image" class="product-image" />
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="product-price">{{ product.price }} €</p>
          <p class="product-description">{{ product.description }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Published:</strong> {{ product.yearPublished }}</p>
          <p><strong>Average Grade:</strong> {{ product.avg_grade }}</p>
          <p><strong>Players:</strong> {{ product.min_players }} - {{ product.max_players }}</p>
          <p><strong>Age:</strong> {{ product.min_age }}+</p>
        </div>
      </div>

      <div v-if="product.quantity_available > 0" class="product-actions">
        <button @click="addToCart">Add to Cart</button>
      </div>
      <div v-else class="out-of-stock">Out of stock</div>
    </div>
    <div v-else>
      <p>Product not found.</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);
const loading = ref(true);


onMounted(async () => {
  const productId = route.params.id;
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    const data = await response.json();
    product.value = data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    loading.value = false;
  }
});

// Add product to the cart
const addToCart = () => {
  // need to implement this function
  console.log('Product added to cart:', product.value.name);
};
</script>

<style scoped>
.product-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  max-width: 1000px;
  padding: 20px;
}

.product-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
  max-width: 1000px;
  background-color:rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.product-image {
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-info h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff4683;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.8rem;
  color: #ff4683;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-description {
  font-size: 1.1rem;
  color: #555;
  margin-top: 10px;
  line-height: 1.6;
}

.product-info p {
  font-size: 1rem;
  color: #777;
  margin: 5px 0;
}

.product-info strong {
  color: #333;
}

/* Action buttons (Add to cart) */
.product-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.product-actions button {
  background-color: #ff4683;
  color: white;
  font-size: 1.4rem;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.product-actions button:hover {
  background-color: #e34c73;
}

/* Out of stock styling */
.out-of-stock {
  color: red;
  font-weight: bold;
  margin-top: 20px;
  font-size: 1.2rem;
}

/* Loading state */
.loading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 20px;
}
</style>
