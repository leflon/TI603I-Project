<template>
  <div>
    <h1>Your account</h1>
    <hr class="solid">
    <UserProfile/>
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
import UserProfile from '@/components/UserProfile.vue';
</script>
  
<style scoped>
  hr.solid {
    border-top: 1px solid var(--color-primary);
    margin: 20px;
  }
</style>
  