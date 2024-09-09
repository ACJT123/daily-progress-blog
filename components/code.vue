<script setup>
import hljs from "highlight.js";
import CodeEditor from "simple-code-editor";

const props = defineProps({
  code: String,
  language: String,
});
</script>

<template>
  <LazyClientOnly>
    <CodeEditor
      width="100%"
      v-model="props.code"
      :languages="[[props.language]]"
      :read-only="true"
    >
    </CodeEditor>
  </LazyClientOnly>
</template>
