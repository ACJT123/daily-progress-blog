<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const showNavbar = ref(true);

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;

  // Only show navbar when user scrolls to the top
  if (currentScrollPosition > 0) {
    showNavbar.value = false;
  } else {
    showNavbar.value = true;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="relative">
    <nav
      :class="[
        'fixed top-0 w-full z-50 transition-transform duration-200',
        showNavbar
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
      ]"
    >
      <ul
        class="flex gap-4 py-8 px-[20px] md:px-[50px] lg:px-[80px] xl:px-[200px] items-baseline shadow-md shadow-green-400/25 bg-black"
      >
        <li class="flex-grow hidden md:block">
          <NuxtLink to="/">ACJT Daily Progress Blog</NuxtLink>
        </li>
        <li class="flex-grow block md:hidden">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="flex-grow-0">
          <NuxtLink to="/blogs">Blogs</NuxtLink>
        </li>
        <li class="flex-grow-0">
          <NuxtLink to="/categories">Categories</NuxtLink>
        </li>
        <li class="flex-grow-0">
          <NuxtLink to="/about">About</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="sass" scoped>
li:first-child
  @apply hover:text-green-400 transition-all
  a
    @apply text-2xl font-bold

li:not(:first-child)
  @apply hover:text-green-400 transition-all
  a
    @apply text-lg font-semibold
</style>
