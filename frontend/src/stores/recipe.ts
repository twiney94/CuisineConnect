import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Recipe, RecipePrototype, RecipeAPIPrototype } from '@/types/types'
import jsonFile from '@/assets/recipes.json'

export const useRecipeStore = defineStore('recipe', () => {
  const recipe: Ref<Recipe | null> = ref(null)
  const recipes: Ref<RecipePrototype[]> = ref([])
  const recommandations: Ref<RecipeAPIPrototype[]> = ref([])

  const getRecipeFromApi = async (id: string) => {
    const response = await fetch(`http://localhost:3000/recipes/${id}`)
    const data = await response.json()
    recipe.value = data
  }

  const getRecommandationsFromApi = async (recipe: string): Promise<RecipeAPIPrototype[]> => {
    // send this: {"dish": recipe, "language": "english"}
    const req = {
      dish: recipe,
      language: 'français'
    }

    // POST request options
    const options = {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch('http://localhost:3000/recipeRecommendation', options)

    const data = await response.json()
    const dataRecommandations: RecipeAPIPrototype[] = data.recipes
    recommandations.value = dataRecommandations
    return dataRecommandations
  }

  const findRecipeFromString = async (str: string) => {
    if (str.length < 3) return
    recipes.value = []

    // POST request, body is {query : str, language: 'en'}
    const req = {
      query: str,
      language: 'français'
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
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data)
        recipes.value.push(data)
        return recipe
      })
  }

  const getRecipeFromJsonFile = async (id: string) => {
    console.log('Getting recipe, id: ', id)
    const data = jsonFile
    recipe.value = data.find((recipe: RecipePrototype) => recipe.id === id) || null
    if (!recipe.value) {
      console.log('Recipe not found')
    }
  }

  return {
    recipe,
    recipes,
    recommandations,
    getRecipeFromApi,
    getRecipeFromJsonFile,
    findRecipeFromString,
    getRecommandationsFromApi
  }
})
