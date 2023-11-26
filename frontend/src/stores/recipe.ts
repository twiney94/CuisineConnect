import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Recipe, RecipePrototype } from '@/types/types'
import jsonFile from '@/assets/recipes.json'

export const useRecipeStore = defineStore('recipe', () => {
  const recipe: Ref<Recipe | null> = ref(null)
  const recipes: Ref<RecipePrototype[]> = ref([])

  const getRecipeFromApi = async (id: string) => {
    const response = await fetch(`http://localhost:3000/recipes/${id}`)
    const data = await response.json()
    recipe.value = data
  }

  const getRecipeFromJsonFile = async (id: string) => {
    console.log('Getting recipe, id: ', id)
    const data = jsonFile
    recipe.value = data.find((recipe: RecipePrototype) => recipe.id === id) || null
    if (!recipe.value) {
      console.log('Recipe not found')
    }
  }

  return { recipe, getRecipeFromApi, getRecipeFromJsonFile }
})
