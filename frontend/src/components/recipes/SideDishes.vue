<template>
  <fwb-modal v-if="modelValue" size="5xl" @close="$emit('update:modelValue', false)">
    <template #header>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Side dishes for {{ dish }}
      </h2>
    </template>
    <template #body>
      <div class="flex justify-evenly">
        <fwb-card
          variant="horizontal"
          v-for="accompaniement in accompaniements"
          :key="accompaniement"
        >
          <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ accompaniement }}
            </h5>
          </div>
        </fwb-card>
      </div>
    </template>
  </fwb-modal>
</template>

<script setup lang="ts">
import { FwbModal, FwbCard } from 'flowbite-vue'
import { useRecipeStore } from '@/stores/recipe'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const { accompaniements } = storeToRefs(useRecipeStore())
const { getAccompanimentsFromApi } = useRecipeStore()

// accompaniements is like this : [ "Vin blanc", "Tiramisu", "Parmesan râpé" ]
// We want an array with [0] => "Vin blanc" [1] => Tiramisu...

onMounted(async () => {
  await getAccompanimentsFromApi(props.dish).then(() => {
    console.log(accompaniements.value)
  })
})

const props = defineProps(['modelValue', 'dish'])
</script>
