<template>
  <div class="font-montserrat min-h-screen">
    <div class="h-20"></div>
    <div class="dark:bg-slate-900">
      <div class="container mx-auto">
        <!-- top -->

        <div class="flex flex-col items-center">
          <h1 class="text-[#a3001b] font-bold mt-3">POSTS</h1>
          <h1 class="hidden sm:block text-3xl gap-10 mb-6 dark:text-white">
            Share your favorites
          </h1>
          <div
            class="catContainer flex whitespace-nowrap w-full h-[3rem] mt-0 mb-0 my-auto md:flex-nowrap gap-x-4 px-4 items-center overflow-x-scroll justify-start lg:justify-center"
          >
            <button
              @click="setCategory('All')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              All
            </button>
            <button
              @click="setCategory('Non-Fiction')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Non-Fiction
            </button>
            <button
              @click="setCategory('Detective & Mystery')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Detective & Mystery
            </button>

            <button
              @click="setCategory('Fantasy & SF')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Fantasy & SF
            </button>
            <button
              @click="setCategory('Romance')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Romance
            </button>
            <button
              @click="setCategory('Thriller')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Thriller
            </button>
            <button
              @click="setCategory('Young Adult')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Young Adult
            </button>
            <button
              @click="setCategory('Others')"
              class="bg-[#FCF5EE] px-2 py-1 md:px-3 md:py-2 text-[#a3001b] rounded-md font-bold text-xs sm:text-sm md:text-base shadow-md"
            >
              Others
            </button>
          </div>
        </div>

        <div class="h-full">
          <div class="flex flex-wrap justify-evenly">
            <PostList :posts="filteredPosts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "../../components/PostList.vue";
import Navbar from "../../components/Navbar.vue";
import getCollection from "../../composables/getCollection";
import { ref, watch, watchEffect } from "vue";

export default {
  components: { PostList, Navbar },
  setup() {
    const { documents } = getCollection("posts");
    const allPosts = ref([]);
    const currentCat = ref("All");
    const filteredPosts = ref(documents);
    const setCategory = async (cat) => {
      currentCat.value = cat;
    };

    watchEffect(async () => {
      if (allPosts.value.length == 0) {
        documents.value.map((post) => allPosts.value.push(post));
      }
    });

    watch(currentCat, async () => {
      console.log("allposts is ", allPosts.value);
      if (currentCat.value == "All") {
        filteredPosts.value = allPosts.value;
        console.log("all is ", filteredPosts.value);
      } else {
        filteredPosts.value = allPosts.value.filter(
          (post) => post.category === currentCat.value
        );
      }

      console.log("allpost after change is ", allPosts);
    });

    const handleClick = async () => {
      const filteredPosts = await documents._rawValue.filter(
        (post) => post.category === currentCat
      );
      console.log(filteredPosts);
    };
    return { documents, handleClick, setCategory, filteredPosts };
  },
};
</script>

<style scoped>
.catContainer {
  --webkit-overflow-scrolling: touch;
}
.catContainer::-webkit-scrollbar {
  display: none;
}
</style>
