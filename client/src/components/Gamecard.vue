<template>
  
<RouterLink
  :to="`/product/${props.data.id}`"
  class="gamecard"
  :style="{ '--bg-url': `url(${props.data.imageUrl})` }"
>
    <div class="bottom">
      <h2>{{ props.data.name }} <span class='grade'>⭐{{ (props.data.avg_grade) }}</span>
      <div class='stock'>{{ props.data.quantity_available }} in stock</div></h2>
      <div class="labels">
        <span>{{ props.data.category }}</span>
      </div>
      <h3 class="price">{{ props.data.price }} €</h3>
    </div>
  </RouterLink>
</template>

<script setup>
  const props = defineProps({
    data: Object,
  });
</script>

<style scoped>
.gamecard {
  display: block;
  cursor: pointer;
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
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent), var(--bg-url);
  --bg-url: none;
}

.gamecard:hover {
  transform: scale(1.04);
  box-shadow: rgba(0, 0, 0, 0.211) 0px 5px 15px;
}


h2 {
  display: flex;
  align-items: center;
}

.stock {
  font-size: 12px;
  color: white;
}
h2 {
  font-size: 25px;
  font-weight: 900;
  position: absolute;
  bottom: 21px;
  left: 12px;
  color: var(--color-div);
}

h3 {
  color: var(--color-div);
}

.labels {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 5px;
  left: 8px;
}

span {
  background-color: var(--color-dark);
  color: var(--color-div);
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  font-size: 12px;
}

span:hover {
  color: var(--color-secondary);
  background-color: var(--color-div);
}

.price {
  position: absolute;
  bottom: 16px;
  right: 12px;
  font-size: 16px;
}
</style>


