<template>
  <div>
    <h1>Your account</h1>
    <hr class="solid">
    <h2>Details</h2>
    name: <i>John Doe</i><br>
    email: <i>john.doe@efrei.net</i><br>
    password: <i>********</i><br>
    <hr class="solid">
    <Orders/>
    <hr class="solid">
    <Wishlist/>
    <hr class="solid">
  </div>
</template>

<script setup>
  import Wishlist from '../components/Wishlist.vue';
  import Orders from '../components/Orders.vue';
</script>
  
<style scoped>
  hr.solid {
    border-top: 1px solid var(--color-primary);
    margin: 20px;
  }
</style>
  