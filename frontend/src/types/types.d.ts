export interface RecipePrototype {
  id: string
  name: string
  reviews: number
  image: string
  difficulty: number
  prepTime: number
  cookTime: number
  reviewAverage: number
  reviewNumber: number
}

export interface Recipe {
  id: string
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
  id: string
  userId: string
  recipeId: string
  rating: number
}

export interface Ingredient {
  id: number
  name: string
  quantity: number
  unit: string
}
