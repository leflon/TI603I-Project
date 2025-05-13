TI603I-Project/client/src/components/inputs/ListInput.vue#L1-61
<template>
  <div class="list-input">
    <div v-for="(item, idx) in modelValue" :key="idx" class="list-item">
      <input
        type="text"
        v-model="localList[idx]"
        @input="updateItem(idx, $event.target.value)"
        class="list-input-field"
      />
      <button type="button" @click="removeItem(idx)" class="remove-btn">Remove</button>
    </div>
    <button type="button" @click="addItem" class="add-btn">Add</button>
  </div>
</template>

<script setup>
import { ref, watch, toRefs } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['update:modelValue']);

const localList = ref([...props.modelValue]);

watch(
  () => props.modelValue,
  (newVal) => {
    localList.value = [...newVal];
  }
);

function updateItem(idx, value) {
  localList.value[idx] = value;
  emit('update:modelValue', [...localList.value]);
}

function addItem() {
  localList.value.push('');
  emit('update:modelValue', [...localList.value]);
}

function removeItem(idx) {
  localList.value.splice(idx, 1);
  emit('update:modelValue', [...localList.value]);
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
