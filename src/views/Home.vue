<template>
  <div class="font-montserrat">
    <div
      class="h-1/2 lg:h-screen bg-gradient-to-b from-[#FCF5EE] dark:from-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      <div
        class="absolute hidden lg:block -top-[60%] -right-[70%] mx-auto w-[70rem] h-[70rem] scale-x-150 rounded-full -z-50 bg-[#ffd2d9]"
      ></div>
      <div
        class="absolute hidden lg:block -bottom-[80%] -right-[40%] mx-auto w-[70rem] h-[65rem] scale-y-110 scale-x-150 rounded-full -z-50 bg-[#ffd2d9]"
      ></div>

      <!-- banner text -->
      <div class="absolute flex flex-col gap-9 top-1/3 font-bold left-[10%]">
        <span class="text-gray-600 text-xl sm:text-4xl md:text-6xl xl:text-7xl"
          >Join Us & Discover
        </span>
        <div class="flex items-center">
          <h1
            class="text-gray-600 whitespace-nowrap text-md sm:text-2xl md:text-4xl xl:text-6xl mr-4"
          >
            the best
          </h1>

          <TypeEffect />
        </div>
        <button
          class="self-start bg-[#ff7088] rounded-full text-2xl text-white py-3 px-4 hover:scale-105 hover:shadow-md duration-300"
        >
          Learn More
        </button>
      </div>

      <div
        class="hidden absolute h-fit lg:flex lg:flex-col w-1/4 top-0 bottom-0 my-auto right-5 sm:right-10 md:right-1/4 lg:right-10 xl:right-[20%]"
      ></div>
    </div>

    <!-- suggestion -->
    <Suggestion :singlepost="documents.slice(0, 1)" />

    <!-- recent posts -->
    <div id="latest" class="py-40 dark:bg-slate-900">
      <div class="container mx-auto">
        <!-- top -->
        <div class="flex flex-col gap-3 items-center">
          <h1 class="text-[#a3001b] text-2xl font-bold">POST</h1>
          <h1 class="text-3xl text-[#3d000c]">Recent Posts</h1>
          <div class="flex flex-col">
            <p class="text-indigo-800 m-0">more</p>
            <button
              @click="toAllPost"
              class="text-indigo-800 material-symbols-outlined m-0 hover:text-indigo-300"
            >
              expand_more
            </button>
          </div>
        </div>
        <!-- bottom -->
        <div class="p-5 sm:p-0 flex flex-wrap justify-evenly">
          <PostList :posts="documents.slice(0, 6)" />
        </div>
      </div>
    </div>

    <!-- contact -->
    <Contact />
  </div>
</template>

<script>
import Suggestion from "../components/Suggestion.vue";
import Contact from "../components/Contact.vue";
import getCollection from "../composables/getCollection";
import PostList from "../components/PostList.vue";
import { useRouter } from "vue-router";
import TypeEffect from "../components/TypeEffect.vue";
import MyFooter from "../components/MyFooter.vue";

export default {
  components: {
    Contact,
    PostList,
    Suggestion,
    TypeEffect,
    MyFooter,
  },
  setup() {
    const { documents } = getCollection("posts");
    const router = useRouter();

    const toAllPost = () => {
      router.push({ name: "AllPosts" });
    };

    return { documents, toAllPost };
  },
};
</script>

<style></style>
