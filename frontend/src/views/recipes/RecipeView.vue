<template>
  <div class="flex flex-col gap-4">
      <shopping-list v-if="recipe" v-model="shoppingList" :dish="recipe.name" />
    <h1 class="text-3xl text-primary font-bold mt-4">
      <font-awesome-icon icon="fa-solid fa-bowl-food" /> {{ recipe?.name }}
    </h1>
    <HeaderRecap
      v-if="recipe"
      :total-time="recipe.prepTime + recipe.cookTime"
      :difficulty="recipe.difficulty"
      :servings="recipe.servings"
      :dish="recipe.name"
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
    <div class="flex justify-between">
      <h2 class="text-2xl text-primary font-bold mt-4">Ingredients</h2>
      <fwb-button @click="shoppingList = true" class="bg-primary hover:bg-orange-300">
        <template #prefix>
          <font-awesome-icon icon="fa-solid fa-cart-shopping" />
        </template>
        I want my shopping list!
      </fwb-button>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="ingredient in recipe?.ingredients" :key="ingredient.id">
        <div
          class="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 hover:bg-gray-50 transition duration-200 ease-in-out"
        >
          <div class="flex flex-row items-center">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://botticellifoods.com/cdn/shop/products/botticelli-product-sauce-truffle-alfredo-14_5oz_600x.png?v=1631037885"
                alt=""
              />
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ ingredient.name }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ ingredient.quantity }} {{ ingredient.unit }}
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <button
              type="button"
              class="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-gray-400 rounded-lg border hover:bg-primary focus:ring-4 focus:outline-none focus:ring-secondary"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-2xl text-primary font-bold mt-4">Instructions</h2>
    <div class="flex flex-col gap-4">
      <div v-for="instruction in recipe?.instructions" :key="instruction">
        <div
          class="flex flex-row justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 hover:bg-gray-50 transition duration-200 ease-in-out"
        >
          <div class="flex flex-row items-center">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src="https://botticellifoods.com/cdn/shop/products/botticelli-product-sauce-truffle-alfredo-14_5oz_600x.png?v=1631037885"
                alt=""
              />
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900 dark:text-white">
                {{ instruction }}
              </div>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <button
              type="button"
              class="inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-gray-400 rounded-lg border hover:bg-primary focus:ring-4 focus:outline-none focus:ring-secondary"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <h2 class="text-2xl text-primary font-bold mt-4">
      Yummy, CuisineBot has some ideas next for you!
    </h2>
    <div class="flex flex-row gap-2 mb-40 justify-center">
      <template v-if="recommandations.length > 0">
        <RecipeCard
          v-for="recipe in recommandations"
          :key="recipe.name"
          :recipeProp="recipe"
          :compact="true"
        />
      </template>
      <template v-else>
        <fwb-spinner color="yellow" size="12" />
      </template>
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
import { onMounted, ref } from 'vue'
import { FwbCard, FwbRating, FwbSpinner, FwbButton } from 'flowbite-vue'
import RecipeCard from '@/components/RecipeCard.vue'
import type { RecipeAPIPrototype } from '@/types/types'
import ShoppingList from '@/components/recipes/ShoppingList.vue'

const { recipe, recipes } = storeToRefs(useRecipeStore())
const { getRecipeFromJsonFile, getRecommandationsFromApi } = useRecipeStore()

const shoppingList = ref<boolean>(false)

const recommandations = ref<Array<RecipeAPIPrototype>>([])

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  console.log(props.id)
  await getRecipeFromJsonFile(props.id)?.then(async () => {
    if (recipe.value) recommandations.value = await getRecommandationsFromApi(recipe?.value.name)
  })
})
</script>
