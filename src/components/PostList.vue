<template>
  <div v-for="post in posts" :key="post.id">
    <router-link
      :to="{ name: 'PostDetails', params: { id: post.id } }"
      class="w-60 md:w-mid sm:w-large lg:w-large shadow-xl rounded-lg p-5 my-3 md:my-10 flex flex-col gap-3 overflow-hidden text-center transition-all hover:scale-105 duration-300"
    >
      <div class="flex items-center gap-x-3">
        <img
          class="inline-block w-14 h-14 rounded-full md:w-24 md:h-24 object-cover"
          :src="post.coverUrl"
        />
        <h1
          class="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl w-[60%] dark:text-white"
        >
          {{ post.title }}
        </h1>
      </div>
      <p class="px-0 pb-6 h-10 text-gray-400 text-lg">
        {{ post.description.substr(0, 55) }}
      </p>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const category = ref("");

    const search = ref(false);
    const toCreatePost = () => {
      router.push({ name: "CreatePost" });
    };

    const toDetail = () => {
      router.push({ name: "PostDetail", params: { id: post.id } });
    };

    const handleClick = () => {
      search.value = true;
    };

    return {
      toCreatePost,
      toDetail,
      category,

      search,
      handleClick,
    };
  },
  props: ["posts"],
};
</script>
