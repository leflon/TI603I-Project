<template>
  <div class="list-input">
    <div v-for="(item, i) in modelValue" :key="i" class="list-item">
      <input type="text" v-model="model[i]" @input="updateItem(i, $event.target.value)" class="list-input-field" />
      <button type="button" @click="removeItem(i)" class="remove-btn">Remove</button>
    </div>
    <button type="button" @click="addItem" class="add-btn">Add</button>
  </div>
</template>

<script setup>
import {ref, watch, defineModel} from 'vue';

const model = defineModel();

function updateItem(i, value) {
  model.value[i] = value;
  model.value = [...model.value]; // Triggers the update
}

function addItem() {
  model.value.push('');
  model.value = [...model.value];
}

function removeItem(i) {
  model.value.splice(i, 1);
  model.value = [...model.value];
}
</script>

<style scoped>
.list-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.list-input-field {
  flex: 1;
  padding: 6px;
}

.add-btn,
.remove-btn {
  padding: 4px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn {
  background: #4caf50;
  color: #fff;
  align-self: flex-start;
}

.remove-btn {
  background: #f44336;
  color: #fff;
}

.add-btn:hover {
  background: #388e3c;
}

.remove-btn:hover {
  background: #c62828;
}
</style>
