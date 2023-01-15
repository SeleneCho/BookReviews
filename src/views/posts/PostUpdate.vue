<template>
  <section class="bg-[#FCF5EE] min-h-screen flex items-center justify-center">
    <!-- form -->
    <div class="md:w-2/3 px-8 md:px-16">
      <h2 class="font-bold text-2xl text-[#a3001b]">Update Post</h2>
      <p class="text-xs mt-4 text-[#a3001b]">Choose a category</p>

      <select
        required
        class="p-2 mb-4 rounded-xl border w-full"
        v-model="category"
      >
        <option>Non-Fiction</option>
        <option>Detective & Mystery</option>
        <option>Fantasy & SF</option>
        <option>Romance</option>
        <option>Thriller</option>
        <option>Young Adult</option>
        <option>Others</option>
      </select>

      <form
        action=""
        class="flex flex-col gap-4"
        @submit.prevent="handleSubmit"
      >
        <div class="relative">
          <textarea
            required
            class="p-2 rounded-xl border w-full h-32 md:h-40 lg:h-44"
            v-model="description"
            name="description"
            placeholder="description"
          >
          </textarea>
        </div>

        <button
          class="bg-[#a3001b] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full md:w-1/2 lg:w-1/3 left-0 right-0 mx-auto"
          v-if="!isPending"
        >
          Update
        </button>
        <button
          class="bg-[#a3001b] rounded-xl text-white py-2 hover:scale-105 duration-300"
          v-if="isPending"
          disabled
        >
          Saving...
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import useCollection from "../../composables/useCollection";
import { timestamp } from "../../firebase/config";
import { useRouter } from "vue-router";
import useDocument from "../../composables/useDocument";
import getDocument from "../../composables/getDocument";
export default {
  props: ["id"],
  setup(props) {
    const { document: currentDoc } = getDocument("posts", props.id);
    const { updateDoc } = useDocument("posts", props.id);
    const { error } = useCollection("posts");
    const router = useRouter();
    const title = ref(currentDoc.title);
    const description = ref("");
    const isPending = ref(false);
    const category = ref("");
    const author = ref("");

    const handleSubmit = async () => {
      isPending.value = true;

      await updateDoc({
        description: description.value,
        category: category.value,
        createdAt: timestamp(),
      });
      isPending.value = false;
      if (!error.value) {
        router.push({ name: "PostDetails", params: { id: props.id } });
      }
    };

    return {
      title,
      description,
      handleSubmit,
      isPending,
      category,
      author,
      currentDoc,
    };
  },
};
</script>

<style></style>
