<template>
  <div class="flex text-lg justify-between">
    <div class="flex gap-4">
      <div class="flex text-primary font-bold">
        <h2>
          <font-awesome-icon icon="fa-solid fa-clock" />
          {{ totalTime }} minutes
        </h2>
      </div>
      <div class="font-bold" :class="difficultyColor">
        <h2>
          <font-awesome-icon icon="fa-solid fa-gauge" />
          Difficulty: {{ difficulty }}
        </h2>
      </div>
      <h2 class="text-primary font-bold">
        <font-awesome-icon icon="fa-solid fa-users" /> {{ servings }} servings
      </h2>
    </div>
    <FwbButton @click="openSideDishes = true" class="bg-primary hover:bg-orange-300">
      <template #prefix>
        <font-awesome-icon icon="fa-solid fa-plus" />
      </template>
      Give me side dishes!!!
    </FwbButton>
  </div>
  <side-dishes v-model="openSideDishes" :dish="dish"/>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { FwbButton } from 'flowbite-vue'
import SideDishes from '@/components/recipes/SideDishes.vue'
const openSideDishes = ref<boolean>(false)

const props = defineProps({
  totalTime: {
    type: Number,
    required: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  dish: {
    type: String,
    required: true
  }
})

const difficultyColor = computed(() => {
  switch (props.difficulty) {
    case 1:
      return 'text-green-500'
    case 2:
      return 'text-yellow-500'
    case 3:
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
})
</script>
