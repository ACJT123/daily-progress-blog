<script setup lang="ts">
import Skeleton from "primevue/skeleton";
import { SkeletonType } from "~/server/types/skeleton";

const { skType } = defineProps<{
  skType: SkeletonType;
}>();
</script>

<template>
  <ClientOnly>
    <template v-if="skType === SkeletonType.BLOG">
      <Skeleton class="mb-2"></Skeleton>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </template>

    <template v-else-if="skType === SkeletonType.BLOGS">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <template v-for="i in 4">
          <Skeleton class="mb-2" height="400px" borderRadius="16px"></Skeleton>
        </template>
      </div>
    </template>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>
