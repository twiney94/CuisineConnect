<template>
  <header class="mb-4">
    <div class="wrapper">
      <fwb-navbar>
        <template #logo>
          <fwb-navbar-logo
            alt="Cuisine Connect Logo"
            image-url="https://svgur.com/i/zbj.svg"
            link="#"
          />
        </template>
        <template #default="{ isShowMenu }">
          <!-- search bar -->
          <div class="flex-grow px-4">
            <NavBar />
          </div>
        </template>
        <template #right-side>
          <fwb-button class="bg-transparent hover:bg-transparent focus:ring-transparent"><fwb-avatar rounded /></fwb-button>
        </template>
      </fwb-navbar>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { FwbButton, FwbNavbar, FwbNavbarLogo, FwbAvatar } from 'flowbite-vue'
import NavBar from './components/home/NavBar.vue'
</script>
