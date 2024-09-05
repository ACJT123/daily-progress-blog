<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "nuxt/app";
import type { SingleBlog } from "~/server/types/blog";

const blog = ref<SingleBlog>({});
const loading = ref(true);

const route = useRoute();

const fetchBlog = async () => {
  try {
    const { data }: { data: { value: { block?: any[]; headers?: any } } } =
      await useFetch(`/api/blog/${route.params.id}`);

    blog.value.block = Array.isArray(data.value.block) ? data.value.block : [];
    blog.value.headers = data.value.headers;

    console.log("blog", blog.value);
  } catch (error) {
    console.error(error);
  }
};

fetchBlog();
</script>

<template>
  <div class="flex gap-10 py-4 relative">
    <aside
      class="bg-green-400/20 rounded-md px-4 py-2 pb-4 w-[200px] h-fit sticky top-[15%]"
    >
      <h1 class="border-b-2 border-white/10 p-2 pt-0 pl-0">Table Of Content</h1>

      <p v-for="block in blog.block" class="text-[12px]">
        <template
          v-if="
            block.type === 'heading_1' ||
            block.type === 'heading_2' ||
            block.type === 'heading_3'
          "
        >
          <a
            :href="'#' + block[block.type]?.rich_text[0].text.content"
            class="block mt-2 opacity-70 hover:opacity-100 hover:underline"
          >
            {{ block[block.type]?.rich_text[0].text.content }}
          </a>
        </template>
      </p>
    </aside>

    <div class="flex-1">
      <h1 class="font-bold text-2xl text-center">
        {{ blog.headers?.Name.title[0].text.content }}
      </h1>

      <NuxtImg
        :src="blog.headers && blog.headers['Files & media'].files[0].file.url"
        :alt="blog.headers?.Name.title[0].text.content"
        class="h-[300px] object-cover mx-auto mt-4 rounded-lg"
      />

      <p v-for="block in blog.block">
        <br />

        <template
          v-if="
            block.type === 'heading_1' ||
            block.type === 'heading_2' ||
            block.type === 'heading_3'
          "
        >
          <h1
            class="text-xl font-bold mt-4"
            :id="block[block.type]?.rich_text[0].text.content"
          >
            {{ block[block.type]?.rich_text[0].text.content }}
          </h1>
        </template>

        <template v-else-if="block.type === 'paragraph'">
          <p class="mt-2">
            {{ block.paragraph?.rich_text[0].text.content }}
          </p>
        </template>

        <template v-else-if="block.type === 'numbered_list_item'">
          <div class="flex items-baseline gap-2">
            <span> {{ block.number }}. </span>

            <p class="mt-2">
              <span>
                {{ block.numbered_list_item?.rich_text[0].text.content }}
              </span>
            </p>
          </div>
        </template>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
