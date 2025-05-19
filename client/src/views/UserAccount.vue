<template>
  <div>
    <h1>Your Account</h1>
    <div>
      <hr>
      <UserProfile />
      <hr>
      <Orders />
      <hr>
      <Wishlist/>
    </div>
  </div>
</template>

<script setup>
import UserProfile from "@/components/UserProfile.vue";
import Orders from "@/components/Orders.vue";
import Wishlist from "@/components/Wishlist.vue";

</script>
<style scoped>

</style>