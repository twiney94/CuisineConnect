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

  const findRecipeFromString = (str: string) => {
    // POST request, body is {query : str, language: 'en'}
    const req = {
      query: str,
      language: 'en'
    }

    // POST request options
    const options = {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // POST request to API
    fetch('http://localhost:3000/findRecipe', options)
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data)

        return recipe
      }
      )
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
