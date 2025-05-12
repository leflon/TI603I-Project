<script setup>

const props = defineProps({
    name: String
});
</script>
<template>
    <RouterLink :to='`/search?category=${name}`' class="gamecat">
        <h2>{{ props.name || 'Category' }}</h2>
    </RouterLink>
</template>

<style scoped>
.gamecat {
    cursor: pointer;
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0.815), transparent);
    background-color: var(--color-div);
    height: 64px;
    width: 150px;
    border-radius: 10px;
    transition: all .3s ease;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin: 20px 0;
}

.gamecat:hover {
    transform: scale(1.04);
}

.gamecard:hover h2,
.gamecard:hover h3 {
    color: var(--color-secondary);
    transition: .2s ease;
}

h2 {
    font-size: 25px;
    font-weight: 900;
    color: var(--color-dark);
}
</style>