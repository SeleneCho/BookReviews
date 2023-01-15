<template>
  <section
    class="bg-[#FCF5EE] min-h-screen flex flex-col items-center justify-center overflow-scroll"
  >
    <transition
      name="fade"
      class="fixed w-screen h-screen bg-gray-400 z-10 bg-opacity-50"
    >
      <div v-if="isOpen">
        <div
          class="absolute w-fit h-fit top-0 bottom-0 left-0 right-0 m-auto max-w-lg p-3 rounded-sm shadow-lg bg-white"
        >
          <div>
            <form @submit.prevent="handleSearch">
              <div class="flex items-center">
                <input
                  class="border h-7"
                  type="search"
                  placeholder="book title"
                  v-model="searchBook"
                />
                <button
                  type="submit"
                  class="text-white bg-blue-500 h-7 text-xs p-1"
                  v-if="!isSearchPending"
                >
                  Search
                </button>
                <button
                  class="text-white bg-gray-400 h-7 text-xs p-1"
                  v-else
                  disabled
                >
                  Searching...
                </button>
              </div>
              <div v-if="showSearchResult" class="flex flex-col items-left">
                <div>
                  <div>
                    <div
                      @click="handleSelectedBook(book)"
                      v-for="book in bookList.slice(0, 5)"
                      :key="book.key"
                      class="border rounded-md text-black p-2 my-2 cursor-pointer hover:scale-105 duration-200"
                    >
                      <div>
                        <span class="font-bold">Title: </span>
                        <span>{{ book.title }}</span>
                      </div>
                      <div v-if="book.author_name">
                        <span class="font-bold">Author: </span>
                        <span>{{ book.author_name[0] }}</span>
                      </div>
                      <div v-else>Author: Unknown</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button
                @click="handleClose"
                class="mb-2 md:mb-0 border border-indigo-400 px-5 py-2 text-sm shadow-sm tracking-wider text-indigo-400 rounded-2xl hover:scale-105 duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- form -->
    <div class="md:w-2/3 px-8 mb-4 md:px-16">
      <div class="flex justify-between items-baseline">
        <h2 class="font-bold text-2xl text-[#a3001b]">New Post</h2>
        <button
          @click="isOpen = !isOpen"
          data-modal-toggle="search-modal"
          class="text-sm bg-[#a3001b] hover:scale-105 duration-300 rounded-md px-3 py-1 text-white"
        >
          Book Search
        </button>
      </div>

      <p class="text-xs mt-4 text-[#3d000c]">Choose a category</p>

      <select class="p-2 rounded-xl border w-full" v-model="category">
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
        <input
          required
          class="p-2 mt-2 rounded-xl border"
          type="text"
          v-model="title"
          name="title"
          placeholder="title"
        />
        <input
          class="p-2 rounded-xl border"
          type="text"
          v-model="author"
          name="author"
          placeholder="author"
        />
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
          v-if="!isCreatePending"
        >
          Create
        </button>
        <button
          class="bg-[#a3001b] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full md:w-1/2 lg:w-1/3 left-0 right-0 mx-auto"
          v-if="isCreatePending"
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
import getUser from "../../composables/getUser";
import { timestamp } from "../../firebase/config";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { error, addDoc } = useCollection("posts");
    const { user } = getUser();
    const router = useRouter();
    const title = ref("");
    const description = ref("");
    const fileError = ref(null);
    const isCreatePending = ref(false);
    const isSearchPending = ref(false);
    const category = ref("");
    const author = ref("");
    const like = ref(false);
    const hits = ref(0);
    const isOpen = ref(false);
    const showSearchResult = ref(false);
    const searchBook = ref("");
    const bookList = ref([]);
    const bookCoverUrl = ref("");
    const bookTitle = ref("");

    const handleSelectedBook = (e) => {
      title.value = e.title;
      author.value = e.author_name[0];
      bookCoverUrl.value = `https://covers.openlibrary.org/b/id/${e.cover_i}-M.jpg`;
      bookList.value = [];
      isOpen.value = false;
    };

    const handleClose = () => {
      isOpen.value = false;
      searchBook.value = "";
      title.value = "";
      author.value = "";
      bookList.value = [];
    };
    const handleSubmit = async () => {
      isCreatePending.value = true;
      const res = await addDoc({
        title: title.value,
        description: description.value,
        author: author.value,
        userId: user.value.uid,
        username: user.value.displayName,
        like: like.value,
        hits: hits.value,
        coverUrl: bookCoverUrl.value,
        category: category.value,
        // filePath: filePath.value,
        createdAt: timestamp(),
      });
      isCreatePending.value = false;
      if (!error.value) {
        router.push({ name: "PostDetails", params: { id: res.id } });
      }
    };
    const handleSearch = async () => {
      isSearchPending.value = true;
      await fetch(`http://openlibrary.org/search.json?q=` + searchBook.value)
        .then((res) => res.json())
        .then((data) => (bookList.value = data.docs));
      searchBook.value = "";
      showSearchResult.value = true;
      isSearchPending.value = false;
    };
    return {
      title,
      description,
      handleSubmit,
      handleSearch,
      handleClose,
      handleSelectedBook,
      fileError,
      isCreatePending,
      isSearchPending,
      category,
      author,
      isOpen,
      searchBook,
      bookList,
      showSearchResult,
      bookTitle,
    };
  },
};
</script>

<style></style>
