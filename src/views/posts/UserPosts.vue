<template>
  <div class="font-montserrat min-h-screen">
    <div class="h-20"></div>
    <div class="dark:bg-slate-900">
      <div class="container mx-auto">
        <!-- top -->
        <div class="flex flex-col mt-5 items-center">
          <h1 class="text-[#a3001b] font-bold">MY POSTS</h1>
        </div>
        <div class="h-full">
          <div class="flex flex-wrap justify-evenly">
            <PostList :posts="userPosts" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getUser from "../../composables/getUser";
import getCollection from "../../composables/getCollection";
import PostList from "../../components/PostList.vue";
export default {
  components: { PostList },
  setup() {
    const { user } = getUser();

    const { documents: userPosts } = getCollection("posts", [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { userPosts };
  },
};
</script>

<style></style>
