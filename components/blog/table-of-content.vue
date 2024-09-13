<script setup lang="ts">
import { BlockType } from "~/server/types/blog";

const { blog } = defineProps<{
  blog: any;
}>();
</script>

<template>
  <aside
    class="bg-green-400/20 rounded-md px-4 py-2 pb-4 w-[200px] h-fit sticky top-4 hidden md:block"
  >
    <h1 class="border-b-2 border-white/10 p-2 pt-0 pl-0">Table Of Content</h1>

    <p v-for="block in blog.block" class="text-[12px]">
      <template
        v-if="
          block.type === BlockType.HEADING_1 ||
          block.type === BlockType.HEADING_2 ||
          block.type === BlockType.HEADING_3
        "
      >
        <a
          :href="'#' + block[block.type]?.rich_text[0]?.text?.content"
          class="block mt-2 opacity-70 hover:opacity-100 hover:underline"
        >
          {{ block[block.type]?.rich_text[0]?.text?.content }}
        </a>
      </template>
    </p>
  </aside>
</template>

<style lang="scss" scoped></style>
