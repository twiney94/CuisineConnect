<script setup lang="ts">
import { RouterView } from 'vue-router'
import { FwbButton, FwbNavbar, FwbNavbarCollapse, FwbNavbarLink, FwbNavbarLogo } from 'flowbite-vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <fwb-navbar>
        <template #logo>
          <fwb-navbar-logo alt="Flowbite logo" image-url="/images/logo.svg" link="#">
            Flowbite
          </fwb-navbar-logo>
        </template>
        <template #default="{ isShowMenu }">
          <fwb-navbar-collapse :is-show-menu="isShowMenu">
            <fwb-navbar-link is-active link="#">
              <RouterLink to="/"> Home </RouterLink>
            </fwb-navbar-link>
            <fwb-navbar-link link="#">
              <RouterLink to="/services"> Services </RouterLink>
            </fwb-navbar-link>
            <fwb-navbar-link link="#"> Pricing </fwb-navbar-link>
            <fwb-navbar-link link="#"> Contact </fwb-navbar-link>
          </fwb-navbar-collapse>
        </template>
        <template #right-side>
          <fwb-button> Get started </fwb-button>
        </template>
      </fwb-navbar>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
