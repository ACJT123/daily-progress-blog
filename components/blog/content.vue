<script lang="ts" setup>
import { defineProps } from "vue";
import Code from "~/components/blog/code.vue";
import { BlockType } from "~/server/types/blog";

const { block } = defineProps({
  block: Object as () => any,
});

const renderAnnotation = (annotations: any) => {
  const classes = [];

  switch (annotations) {
    case "bold":
      classes.push("font-bold");
      break;
    case "italic":
      classes.push("italic");
      break;
    case "strikethrough":
      classes.push("line-through");
      break;
    case "underline":
      classes.push("underline");
      break;
    case "code":
      classes.push("bg-gray-200 p-1 rounded-md");
      break;
    default:
      break;
  }

  return classes.join(" ");
};
</script>

<template>
  <template
    v-if="
      block.type === BlockType.HEADING_1 ||
      block.type === BlockType.HEADING_2 ||
      block.type === BlockType.HEADING_3
    "
  >
    <h1
      class="text-xl font-bold pt-4 my-6"
      :id="block[block.type]?.rich_text[0]?.text?.content"
    >
      {{ block[block.type]?.rich_text[0]?.text?.content }}
    </h1>
  </template>

  <template v-else-if="block.type === BlockType.PARAGRAPH">
    <p class="mt-2">
      <template v-for="richText in block.paragraph?.rich_text">
        <span :class="renderAnnotation(richText?.annotations)">{{
          richText?.text?.content
        }}</span>
      </template>
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

  <template v-else-if="block.type === BlockType.BULLETED_LIST_ITEM">
    <div class="flex items-baseline gap-2">
      <p class="mt-2">
        <template v-for="list in block.bulleted_list_item?.rich_text">
          <span class="">
            {{ list.text?.content }}
          </span>
        </template>
      </p>
    </div>
  </template>

  <template v-else-if="block.type === BlockType.IMAGE">
    <NuxtImg
      :src="block.image?.file.url"
      class="max-h-[300px] object-cover mx-auto mt-4 rounded-lg"
    />
  </template>

  <template v-else-if="block.type === BlockType.CODE">
    <Code
      :language="block.code?.language"
      :code="block.code?.rich_text[0]?.text?.content"
    />
  </template>

  <template v-else-if="block.type === BlockType.VIDEO">
    {{ block.video?.external.url }}
    <iframe
      class="mx-auto mt-4 4xs:size-full sm:w-[560px] sm:h-[315px]"
      :src="block.video?.external.url"
      :allowfullscreen="true"
    >
    </iframe>
  </template>
</template>
