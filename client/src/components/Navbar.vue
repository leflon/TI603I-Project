<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="nav-left">
      <RouterLink to="/">MIST</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/support">About</RouterLink>
      <input type="text" placeholder="Search" class="search" />
    </div>
    <div class="nav-right">  
      <RouterLink to="/cart"><i class="fa-solid fa-cart-shopping"></i></RouterLink>  
      <RouterLink to="/account"><i class="fa-solid fa-circle-user"></i></RouterLink>
      <RouterLink to="/login">LogOut</RouterLink>
    </div>
  </nav>
</template>


<style scoped>
  nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    text-align: center;
    flex-wrap: wrap;
    background-color: var(--color-tertiary);
    border-radius: 10px;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.383) 0px 2px 8px 0px;
  }

  .nav-left, .nav-right {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    color: white;
  }

  input{
    font-size: 15px;
    box-sizing: border-box;
    border-radius: 8px;
    border: 2px solid var(--color-border);
    outline: none;
    padding: 5px;
    width: 200px;
    height: 30px;
  }

  input:focus {
    border: 2px solid var(--color-primary);
  }

  ::placeholder{
    font-size: 15px;
  }

  i{
    color: white;
  }

  nav a:hover, i:hover {
    color: var(--color-primary);
  }
</style>
