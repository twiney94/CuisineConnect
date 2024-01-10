<template>
  <fwb-modal v-if="modelValue" size="5xl" @close="$emit('update:modelValue', false)">
    <template #header>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your shopping cart for {{ dish }}
      </h2>
    </template>
    <template #body>
      <fwb-table>
        <fwb-table-head>
          <fwb-table-head-cell>Ingredient</fwb-table-head-cell>
        </fwb-table-head>
        <fwb-table-body>
          <fwb-table-row v-for="(ingredient, index) in shoppingList" :key="index">
            <fwb-table-cell>{{ ingredient }}</fwb-table-cell>
          </fwb-table-row>
        </fwb-table-body>
      </fwb-table>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <fwb-button gradient="red-yellow" pill @click="shareOnSocials('twitter')">
          <font-awesome-icon icon="fa-brands fa-x-twitter" />
        </fwb-button>
        <fwb-button gradient="red-yellow" pill @click="shareOnSocials('facebook')">
          <font-awesome-icon icon="fa-brands fa-facebook" />
        </fwb-button>
        <fwb-button gradient="red-yellow" pill @click="shareOnSocials('linkedin')">
          <font-awesome-icon icon="fa-brands fa-linkedin" />
        </fwb-button>
        <fwb-button gradient="red-yellow" pill @click="shareOnSocials('reddit')">
          <font-awesome-icon icon="fa-brands fa-reddit" />
        </fwb-button>
        <fwb-button gradient="red-yellow" pill @click="shareOnSocials('whatsapp')">
          <font-awesome-icon icon="fa-brands fa-whatsapp" />
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup lang="ts">
import {
  FwbModal,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow,
  FwbButton
} from 'flowbite-vue'
import { useRecipeStore } from '@/stores/recipe'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const { shoppingList } = storeToRefs(useRecipeStore())
const { getShoppingListFromApi } = useRecipeStore()

const props = defineProps(['modelValue', 'dish'])

const shareOnSocials = (social: string) => {
  switch (social) {
    case 'twitter':
      window.open(
        `https://twitter.com/intent/tweet?text=I%20just%20made%20a%20${props.dish}%20with%20CuisineBot!%20Check%20it%20out%20on%20https://cuisinebot.netlify.app/`,
        '_blank'
      )
      break
    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=https://cuisinebot.netlify.app/`,
        '_blank'
      )
      break
    case 'linkedin':
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=https://cuisinebot.netlify.app/`,
        '_blank'
      )
      break
    case 'reddit':
      window.open(
        `https://reddit.com/submit?url=https://cuisinebot.netlify.app/&title=I%20just%20made%20a%20${props.dish}%20with%20CuisineBot!%20Check%20it%20out%20on%20https://cuisinebot.netlify.app/`,
        '_blank'
      )
      break
    case 'whatsapp':
      window.open(
        `https://wa.me/?text=I%20just%20made%20a%20${props.dish}%20with%20CuisineBot!%20Check%20it%20out%20on%20https://cuisinebot.netlify.app/`,
        '_blank'
      )
      break
    default:
      break
  }
}

onMounted(async () => {
  await getShoppingListFromApi(props.dish).then(() => {
    console.log(shoppingList.value)
  })
})
</script>
