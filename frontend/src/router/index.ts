import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecipeView from '@/views/recipes/RecipeView.vue'
import NewRecipeView from '@/views/recipes/NewRecipeView.vue'
import EditRecipeView from '@/views/recipes/EditRecipeView.vue'
import RecipeListView from '@/views/recipes/RecipeListView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: RecipeListView
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: RecipeView
    },
    {
      path: '/recipes/new',
      name: 'newRecipe',
      component: NewRecipeView
    },
    {
      path: '/recipes/:id/edit',
      name: 'editRecipe',
      component: EditRecipeView
    }
  ]
})

export default router
