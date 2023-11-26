<template>
  <div class="flex gap-4 text-lg">
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
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity'

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
