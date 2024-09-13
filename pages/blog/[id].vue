<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "nuxt/app";
import { type SingleBlog, type SingleBlogResponse } from "~/server/types/blog";

import { DateTime } from "luxon";
import Content from "~/components/blog/content.vue";
import Skeleton from "~/components/skeleton.vue";
import tableOfContent from "~/components/blog/table-of-content.vue";
import { SkeletonType } from "~/server/types/skeleton";

const blog = ref<SingleBlog>({
  createdDate: DateTime.now().toISO(),
});
const loading = ref(true);

const route = useRoute();

const fetchBlog = async () => {
  try {
    const { data }: { data: { value: SingleBlogResponse } } = await useFetch(
      `/api/blog/${route.params.id}`
    );

    blog.value.block = Array.isArray(data.value.block) ? data.value.block : [];
    blog.value.headers = data.value.headers;
    blog.value.createdDate = data.value.createdDate;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

fetchBlog();
</script>

<template>
  <template v-if="loading">
    <div class="pt-6">
      <Skeleton :skType="SkeletonType.BLOG" />
    </div>
  </template>

  <div v-else class="flex flex-col md:flex-row gap-10 pb-4 pt-6 relative">
    <tableOfContent :blog="blog" />

    <div class="flex-1">
      <h1 class="font-bold text-2xl text-center">
        {{ blog.headers?.Name.title[0].text?.content }}
      </h1>

      <NuxtImg
        :src="blog.headers && blog.headers['Files & media'].files[0].file.url"
        :alt="blog.headers?.Name.title[0].text?.content"
        class="h-[300px] object-cover mx-auto mt-4 rounded-lg"
      />

      <!-- tags and created date -->
      <section class="flex gap-2 items-center justify-center mt-8 gap-8">
        <div class="flex gap-2 items-center">
          <div class="size-4">
            <img
              src="https://img.icons8.com/ios/50/FFFFFF/calendar.png"
              alt="calendar"
            />
          </div>

          <div class="text-[14px]">
            {{ DateTime.fromISO(blog.createdDate).toFormat("dd LLL yyyy") }}
          </div>
        </div>

        <div
          class="flex gap-2 items-center"
          v-if="blog.headers?.Tags.multi_select?.length! > 0"
        >
          <div class="size-4">
            <img
              src="https://img.icons8.com/forma-light/24/FFFFFF/tags.png"
              alt="tags"
            />
          </div>

          <div
            v-for="tag in blog?.headers?.Tags.multi_select"
            :key="tag.id"
            class="bg-green-400/50 text-white text-[12px] px-2 rounded-md"
          >
            {{ tag.name }}
          </div>
        </div>
      </section>

      <section v-for="block in blog.block">
        <br />

        <Content :block="block" />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
