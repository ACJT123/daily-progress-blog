<script setup lang="ts">
import { ref } from "vue";

const msg = ref("Hello Vue 3 + Vite + TypeScript");
</script>
<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/">ACJT Daily Progress Blog</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>
