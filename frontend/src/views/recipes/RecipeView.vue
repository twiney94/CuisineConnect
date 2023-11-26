<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl text-primary font-bold mt-4">
      <font-awesome-icon icon="fa-solid fa-bowl-food" /> {{ recipe?.name }}
    </h1>
    <HeaderRecap
      v-if="recipe"
      :total-time="recipe.prepTime + recipe.cookTime"
      :difficulty="recipe.difficulty"
      :servings="recipe.servings"
    />
    <div class="flex w-full">
      <fwb-card
        v-if="recipe"
        class="dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-full fwb-card"
        :img-src="recipe.image"
        variant="image"
      >
        <div class="p-5">
          <fwb-rating :rating="1" :scale="1" review-link="#" review-text="73 reviews">
            <template #besideText>
              <p class="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
            </template>
          </fwb-rating>
        </div>
      </fwb-card>
    </div>
  </div>
</template>

<style scoped>
.fwb-card :deep(img) {
  max-height: 20rem;
  min-width: -webkit-fill-available;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import HeaderRecap from '@/components/recipes/HeaderRecap.vue'
import { useRecipeStore } from '@/stores/recipe'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { FwbCard, FwbRating } from 'flowbite-vue'

const { recipe } = storeToRefs(useRecipeStore())
const { getRecipeFromJsonFile } = useRecipeStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  console.log(props.id)
  await getRecipeFromJsonFile(props.id)
})
</script>
