<template>
  <div class="font-montserrat">
    <div
      v-for="post in singlepost"
      :key="post.id"
      id="suggestion"
      class="mx-auto dark:bg-slate-900"
    >
      <div class="w-full flex flex-col mt-40 mb-20">
        <h1
          class="text-[#a3001b] text-2xl font-bold w-fit left-0 right-0 mx-auto mb-3"
        >
          Suggestion
        </h1>
        <h1
          class="text-3xl text-[#3d000c] dark:text-white w-fit left-0 right-0 mx-auto mb-3"
        >
          Meet your next favorite book
        </h1>

        <p class="text-indigo-800 m-0 w-fit left-0 right-0 mx-auto">more</p>
        <router-link
          :to="{ name: 'PostDetails', params: { id: post.id } }"
          class="text-indigo-800 material-symbols-outlined m-0 hover:text-indigo-300 w-fit left-0 right-0 mx-auto"
        >
          expand_more
        </router-link>
      </div>
      <div
        v-for="post in singlepost"
        :key="post.id"
        class="container mx-auto flex py-0 flex-col-reverse justify-center lg:flex-row gap-x-[8rem] items-center gap-20"
      >
        <!-- left -->
        <div class="relative">
          <div class="h-full rounded-lx overflow-hidden">
            <img class="border" :src="post.coverUrl" />
          </div>
        </div>
        <!-- right -->
        <div class="my-auto w-1/2 flex flex-col gap-3">
          <h1 class="text-3xl font-medium dark:text-white">
            {{ post.title }}
          </h1>
          <h3>by {{ post.author }}</h3>
          <div class="flex">
            <p class="text-gray-400">{{ post.description.slice(0, 75) }}</p>
            <router-link
              :to="{ name: 'PostDetails', params: { id: post.id } }"
              class="text-indigo-800 material-symbols-outlined m-0 hover:text-indigo-300 w-fit left-0 right-0 mx-auto"
            >
              read_more
            </router-link>
          </div>
          <h2 class="text-gray-400 font-medium">Mystery</h2>
          <div class="w-full bg-gray-200 h-1.5 rounded-md">
            <div class="w-full bg-[#ff99aa] h-1.5 rounded-md"></div>
          </div>
          <h2 class="text-gray-400 font-medium">Romance</h2>
          <div class="w-full bg-gray-200 h-1.5 rounded-md">
            <div class="w-4/6 bg-[#ff99aa] h-1.5 rounded-md"></div>
          </div>
          <h2 class="text-gray-400 font-medium">Fantasy</h2>
          <div class="w-full bg-gray-200 h-1.5 rounded-md">
            <div class="w-5/6 bg-[#ff99aa] h-1.5 rounded-md"></div>
          </div>
          <div class="flex flex-col"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["singlepost"],
  setup() {},
};
</script>
