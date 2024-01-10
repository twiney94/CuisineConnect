<template>
  <fwb-modal v-if="modelValue" size="5xl" @close="$emit('update:modelValue', false)"></fwb-modal>
</template>

<script setup lang="ts">
import { FwbModal } from 'flowbite-vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
</script>
