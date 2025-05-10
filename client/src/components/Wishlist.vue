<template>
    <main>
        <h2>Wishlist</h2>
        <div class="gamecards">
            <Gamecard/>
            <Gamecard/>
            <Gamecard/>
        </div>
    </main>
</template>

<script setup>
    import Gamecard from './Gamecard.vue'

</script>


<style scoped>
    .gamecards{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 10%;
        margin: 20px 0;
    }
</style>
  
