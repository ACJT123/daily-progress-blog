<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "nuxt/app";
import {
  BlockType,
  type SingleBlog,
  type SingleBlogResponse,
} from "~/server/types/blog";
import Code from "~/components/code.vue";
import { DateTime } from "luxon";

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
  }
};

fetchBlog();
</script>

<template>
  <div class="flex flex-col md:flex-row gap-10 pb-4 pt-6 relative">
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

        <template
          v-if="
            block.type === BlockType.HEADING_1 ||
            block.type === BlockType.HEADING_2 ||
            block.type === BlockType.HEADING_3
          "
        >
          <h1
            class="text-xl font-bold mt-4"
            :id="block[block.type]?.rich_text[0]?.text?.content"
          >
            {{ block[block.type]?.rich_text[0]?.text?.content }}
          </h1>
        </template>

        <template v-else-if="block.type === BlockType.PARAGRAPH">
          <p class="mt-2">
            {{ block.paragraph?.rich_text[0]?.text?.content }}
          </p>
        </template>

        <template v-else-if="block.type === BlockType.NUMBERED_LIST_ITEM">
          <div class="flex items-baseline gap-2">
            <span> {{ block.number }}. </span>

            <p class="mt-2">
              <span>
                {{ block.numbered_list_item?.rich_text[0]?.text?.content }}
              </span>
            </p>
          </div>
        </template>

        <template v-else-if="block.type === BlockType.IMAGE">
          <NuxtImg
            :src="block.image?.file.url"
            :alt="blog.headers?.Name.title[0].text.content + ' image'"
            class="max-h-[300px] object-cover mx-auto mt-4 rounded-lg"
          />
        </template>

        <template v-else-if="block.type === BlockType.CODE">
          <Code
            :language="block.code?.language"
            :code="block.code?.rich_text[0]?.text?.content"
          />
        </template>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
