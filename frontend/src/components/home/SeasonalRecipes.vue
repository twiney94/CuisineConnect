<template>
  <h1 class="text-3xl text-primary font-bold my-4">
    <font-awesome-icon icon="fa-solid fa-tree" /> Seasonal Recipes
  </h1>
  <div class="flex gap-4">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<script setup lang="ts">
import RecipeCard from '../RecipeCard.vue'
import type { Recipe } from '@/types/types'

const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Pasta Alfredo',
    description: 'A delicious pasta dish',
    instructions: ['Boil water', 'Add pasta', 'Cook for 10 minutes', 'Drain water', 'Add sauce'],
    ingredients: [
      {
        id: 1,
        name: 'Pasta',
        quantity: 1,
        unit: 'box'
      },
      {
        id: 2,
        name: 'Alfredo Sauce',
        quantity: 1,
        unit: 'jar'
      }
    ],
    image:
      'https://www.foodandwine.com/thmb/tAS-x_IC4ss1cb9EdDpsr0UExdM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg',
    difficulty: 1,
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    authorId: 'qsdqsdazd',
    categoryId: 1
  }
]
</script>
