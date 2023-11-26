export interface Recipe {
  id: number
  name: string
  description: string
  ingredients: Ingredient[]
  instructions: string[]
  image: string
  difficulty: number
  prepTime: number
  cookTime: number
  servings: number
  authorId: string
  categoryId: number
}

export interface Review {
  id: number
  recipeId: number
  rating: number
}

export interface Ingredient {
  id: number
  name: string
  quantity: number
  unit: string
}