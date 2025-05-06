<template>
    <div class="gamecard">
        <div class="bottom">
            <h2>Jumanji</h2>
            <div class="labels">
                <span>Label 1</span>
                <span>Label 2</span>
                <span>Label 3</span>
            </div>
            <h3 class="price">16 €</h3>
        </div>
    </div>
</template>

<style scoped>
    .gamecard{
        background-image: linear-gradient(to top, rgba(255, 255, 255, 0.815), transparent), url('../../public/img/jumanji.png'); 
        background-size: cover;       
        background-position: center; 
        background-repeat: no-repeat;  
        background-color: var(--color-div);
        height: 200px;
        width: 30%;
        border-radius: 10px;
        position: relative;
        transition: all .5s ease;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        margin: 20px 0;
    }

    .gamecard:hover {
        transform: scale(1.04);
        background-image: linear-gradient(to top, rgba(0, 8, 19, 0.895), transparent), url('../../public/img/Jumanji.png'); 
        box-shadow: rgba(0, 0, 0, 0.211) 0px 5px 15px;
    }

    .gamecard:hover h2, .gamecard:hover h3{
        color: var(--color-secondary);
        transition: .2s ease;
    }
    .gamecard:hover span{
        color: var(--color-dark);
        background-color: var(--color-secondary);
        transition: .2s ease;
    }
    h2{
        font-size: 25px;
        font-weight: 900;
        position: absolute;
        bottom: 21px;
        left: 12px;
        color: var(--color-dark);
    }
    h3{
        color: var(--color-dark);
    }
    .labels{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: absolute;
        bottom: 5px;
        left: 8px;
    }   
    span{
        background-color: var(--color-dark);
        color: var(--color-div);
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        font-size: 12px;
    }
    span:hover{
        color: var(--color-secondary);
        background-color: var(--color-div);
    }
    .price{
        position: absolute;
        bottom: 16px;
        right: 12px;
        font-size: 25px;
    }
</style>