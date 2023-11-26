<template>Recipe {{ recipe }}</template>

<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { recipe } = storeToRefs(useRecipeStore())
const { getRecipeFromJsonFile } = useRecipeStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  console.log(props.id);
  await getRecipeFromJsonFile(props.id)
})
</script>
