<template>
  <Header />

  <Layout>
    <NuxtPage />
  </Layout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script lang="ts" setup>
import Header from "~/components/header.vue";
import Layout from "~/components/layout.vue";
</script>
