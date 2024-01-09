<template>
  <main>
    <seasonal-recipes />
    <div class="absolute right-0 bottom-0 p-4">
      <chat-bot />
    </div>
  </main>
</template>

<script setup lang="ts">
import SeasonalRecipes from '@/components/home/SeasonalRecipes.vue'
import ChatBot from '@/components/home/ChatBot.vue'
</script>
