<template>
  <a href="#" class="block max-w-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <fwb-card
      @click="goToRecipe(recipe)"
      img-alt="Desk"
      img-src="https://www.foodandwine.com/thmb/tAS-x_IC4ss1cb9EdDpsr0UExdM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg"
      variant="image"
      class="hover:bg-gray-100"
    >
      <div class="p-5">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ recipe.name }}
        </h5>
        <fwb-rating :rating="1" :scale="1" review-link="#" review-text="73 reviews">
          <template #besideText>
            <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
          </template>
        </fwb-rating>
      </div>
    </fwb-card>
  </a>
</template>

<script setup lang="ts">
import { FwbCard, FwbRating } from 'flowbite-vue'
import router from '@/router'
import type { Recipe } from '@/types/types'
import type { PropType } from 'vue'
import { defineProps } from 'vue'

const goToRecipe = (recipe: Recipe) => {
  console.log('Pushing');
  router.push({
    name: 'Recipe',
    params: { id: recipe.id }
  })
}

const props = defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true
  }
})
</script>
