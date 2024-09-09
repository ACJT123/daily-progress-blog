<template>
  <Head>
    <!-- Google tag (gtag.js) -->
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-DXK6FG1JX7"
    ></Script>
    <Script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-DXK6FG1JX7");
    </Script>
  </Head>
  <Header />

  <Layout>
    <NuxtPage />
  </Layout>

  <Footer />
</template>

<style scoped>
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
import Footer from "~/components/footer.vue";
</script>
