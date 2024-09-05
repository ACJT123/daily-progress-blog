<script lang="ts" setup>
import { ref } from "vue";
import type { Blog } from "~/server/types/blog";
import { DateTime } from "luxon";

const blogs = ref<Blog[]>([]);
const loading = ref(true);

const fetchBlogs = async () => {
  try {
    const { data } = await useFetch("/api/blogs");

    blogs.value = Array.isArray(data.value)
      ? (data.value as Blog[]).filter((_: any, index: number) => index < 4)
      : [];

    loading.value = false;
  } catch (error) {
    console.error(error);
  }
};

fetchBlogs();
</script>

<template>
  <div
    class="flex flex-col-reverse md:flex-row items-center justify-between pt-4"
  >
    <div>
      <h1 class="font-bold text-3xl">Welcome To My Daily Progress Blog Site</h1>

      <p class="max-w-[600px] mt-4">
        This is a blog site where I will be documenting my daily progress. I
        will be posting daily updates on what I have learned and what I have
        done. I will also be posting about any challenges I have faced and how I
        have overcome them.
        <strong>
          <br />
          (Sometimes I will not be able to post daily updates)
        </strong>
      </p>
    </div>
    <div class="size-48 h-fit">
      <img src="/assets/images/hello.png" alt="hello" />
    </div>
  </div>

  <div class="mt-8">
    <h1 class="text-2xl font-bold">Recent Blogs</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>

    <!-- Blog Content -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4"
    >
      <NuxtLink
        to="/blogs"
        v-for="blog in blogs"
        class="transition-transform h-[400px] cursor-pointer hover:scale-105 border-green-400/25 border-2 rounded-xl overflow-hidden"
      >
        <div>
          <NuxtImg
            :src="blog.properties['Files & media'].files[0].file.url"
            :alt="blog.properties.Name.title[0].text.content"
            class="w-full h-[150px] object-cover"
            width="300"
            height="150"
          />
        </div>

        <div class="mt-4 px-4">
          <div class="flex gap-2 items-center mt-2">
            <div class="size-4">
              <img
                src="https://img.icons8.com/ios/50/FFFFFF/calendar.png"
                alt="calendar"
              />
            </div>

            <div class="text-[14px]">
              {{ DateTime.fromISO(blog.created_time).toFormat("dd LLL yyyy") }}
            </div>
          </div>

          <div
            class="flex gap-2 items-center mt-2"
            v-if="blog.properties.Tags.multi_select.length > 0"
          >
            <div class="size-4">
              <img
                src="https://img.icons8.com/forma-light/24/FFFFFF/tags.png"
                alt="tags"
              />
            </div>

            <div
              v-for="tag in blog.properties.Tags.multi_select"
              :key="tag.id"
              class="bg-green-400/50 text-white text-[12px] px-2 rounded-md"
            >
              {{ tag.name }}
            </div>
          </div>

          <h2 class="text-xl font-bold mt-4">
            {{ blog.properties.Name.title[0].text.content }}
          </h2>

          <p class="text-sm mt-2 w-auto truncate-multiline">
            {{ blog.content.paragraph.rich_text[0].plain_text }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
