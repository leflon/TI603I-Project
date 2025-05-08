<script setup>
    import Gamecard from './Gamecard.vue'
    import Carrousel from './Carrousel.vue'
    import Gamecat from './Gamecat.vue'
</script>

<template>
    <div>
        <h2>Our bestsellers</h2>
        <Carrousel/>
        <h2>Browse by categories</h2>
        <div class="gamecats">
            <Gamecat/>
            <Gamecat/>
            <Gamecat/>
            <Gamecat/>
            <Gamecat/>
        </div>
        <h2>Less than 17 €</h2>
        <div class="gamecards">
            <Gamecard/>
            <Gamecard/>
            <Gamecard/>
        </div>
    </div>  
</template>

<style scoped>
    .gamecats{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 0 10%;
        margin: 20px 0;
    }
    .gamecards{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 10%;
        margin: 20px 0;
    }
</style>




