<template>
  <footer class="px-[20px] md:px-[50px] lg:px-[80px] xl:px-[200px] border-t-2 py-4 border-green-400/25">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="col-span-2">
        <h1 class="mb-4 font-bold">About This Site</h1>

        <p class="max-w-[400px]">
          This is a blog site where I will be documenting my daily progress. I
          will be posting daily updates on what I have learned and what I have
          done. I will also be posting about any challenges I have faced and how
          I have overcome them
        </p>
      </div>

      <div>
        <h1 class="mb-4 font-bold">Link</h1>

        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <nuxt-link to="/blogs">Blogs</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/categories">Categories</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">About</nuxt-link>
          </li>
        </ul>
      </div>

      <div>
        <h1 class="mb-4 font-bold">Connections</h1>

        <p>
          I have a few social media accounts. Feel free to connect with me on
        </p>

        <ul class="mt-4">
          <li>
            <a href=" ">Twitter</a>
          </li>
          <li>
            <a href=" ">Facebook</a>
          </li>
          <li>
            <a href=" ">Instagram</a>
          </li>
          <li>
            <a href=" ">LinkedIn</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="sass" scoped>

li
  @apply hover:text-green-400 transition-all
  a
    @apply text-lg
</style>
