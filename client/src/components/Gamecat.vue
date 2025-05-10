<template>
    <div class="gamecat">
        <h2>Cat</h2>
    </div>
</template>

<style scoped>
    .gamecat{
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0.815), transparent); 
        background-size: cover;       
        background-position: center; 
        background-repeat: no-repeat;  
        background-color: var(--color-div);
        height: 200px;
        width: 16%;
        border-radius: 10px;
        transition: all .5s ease;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin: 20px 0;
    }

    .gamecat:hover {
        transform: scale(1.04);
        box-shadow: rgba(0, 0, 0, 0.211) 0px 5px 15px;
    }

    .gamecard:hover h2, .gamecard:hover h3{
        color: var(--color-secondary);
        transition: .2s ease;
    }

    h2{
        font-size: 25px;
        font-weight: 900;
        color: var(--color-dark);
    }
</style>