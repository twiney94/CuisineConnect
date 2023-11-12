<template>
  <h1 class="text-3xl text-primary font-bold my-4">
    <font-awesome-icon icon="fa-solid fa-tree" /> Seasonal Recipes
  </h1>
  <div class="flex gap-4">
    <RecipeCard v-for="i in 4" :key="i" />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '../RecipeCard.vue'
</script>
