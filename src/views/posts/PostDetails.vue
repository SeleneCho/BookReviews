<template>
  <section
    class="min-h-screen w-screen bg-[#FCF5EE] font-montserrat items-center"
  >
    <div class="h-20"></div>

    <div class="w-[70%] left-0 right-0 mx-auto flex flex-col gap-y-6">
      <div class="flex flex-col gap-y-4 sm:flex-row items-center gap-x-10">
        <div>
          <img
            class="h-1/5 md:h-1/4 lg:h-fit lg:w-fit object-cover"
            :src="document.coverUrl"
          />
        </div>

        <div class="flex flex-col gap-y-4">
          <div class="flex gap-x-1">
            <router-link
              :to="{ name: 'Home' }"
              @click="handleDelete"
              v-if="ownership"
              class="mr-5 bg-red-400 rounded-md px-2 py-0.5 text-white hover:bg-red-200"
            >
              Delete
            </router-link>
            <router-link
              :to="{ name: 'PostUpdate', params: { id: document.id } }"
              v-if="ownership"
              class="bg-indigo-400 rounded-md px-2 py-0.5 text-white hover:bg-indigo-200"
            >
              Edit
            </router-link>
          </div>
          <h2 class="text-3xl font-bold">{{ document.title }}</h2>
          <div v-if="document.author" class="space-x-1">
            <span>by </span>
            <span>{{ document.author }}</span>
          </div>
          <h4 class="text-xl">{{ document.username }}</h4>
        </div>
      </div>
      <p class="text-xl m-0 w-full leading-10">
        {{ document.description }}
      </p>
    </div>
  </section>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import getDocument from "../../composables/getDocument";
import getUser from "../../composables/getUser";
import useDocument from "../../composables/useDocument";

export default {
  props: ["id"],

  setup(props) {
    const { document } = getDocument("posts", props.id);
    const { user } = getUser();
    const { deleteDoc } = useDocument("posts", props.id);
    const router = useRouter();
    const ownership = computed(() => {
      return (
        document.value && user.value && user.value.uid == document.value.userId
      );
    });

    const handleDelete = async () => {
      await deleteDoc();
      router.push({ name: "Home" });
    };

    return { document, ownership, handleDelete };
  },
};
</script>

<style></style>
