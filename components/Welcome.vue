<template>
	<div>
		<h1>Welcome, {{ props.name }}!</h1>
	</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
	name: string
}>();
</script>

<style scoped>
h1 {
	color: #333;
}
</style>
