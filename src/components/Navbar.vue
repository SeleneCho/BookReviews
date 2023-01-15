<template>
  <div class="font-montserrat">
    <nav class="w-full h-16 fixed top-0 bg-[#FCF5EE] z-10">
      <div class="container mx-auto py-5 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          <img class="w-8" src="../assets/bookIcon.png" alt="" />
          <span class="text-2xl font-bold text-[#a3001b] dark:text-white"
            >Your Books</span
          >
        </router-link>
        <ul
          v-if="isHome"
          class="hidden md:flex space-x-10 text-[#ff99aa] dark:text-gray-100 font-bold text-sm uppercase"
        >
          <li class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>

          <li class="hover:text-[#a3001b]">
            <a href="#suggestion">Suggestion</a>
          </li>

          <li class="hover:text-[#a3001b]">
            <a href="#latest">Post</a>
          </li>

          <li v-if="user" class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'CreatePost' }">Create</router-link>
          </li>

          <li class="hover:text-[#a3001b]">
            <button v-if="user" @click="handleClick">LOGOUT</button>
            <button v-else @click="toLogin">LOGIN</button>
          </li>
          <li v-if="!user" class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="user" class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'UserPosts' }">Mypage</router-link>
          </li>
        </ul>
        <ul
          v-else
          class="hidden md:flex space-x-10 text-[#ff99aa] dark:text-gray-100 font-bold text-sm uppercase"
        >
          <li class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>

          <li class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'AllPosts' }">Post</router-link>
          </li>

          <li v-if="user" class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'CreatePost' }">Create</router-link>
          </li>

          <li class="hover:text-[#a3001b]">
            <button v-if="user" @click="handleClick">LOGOUT</button>
            <button v-else @click="toLogin">LOGIN</button>
          </li>
          <li v-if="!user" class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li v-if="user" class="hover:text-[#a3001b]">
            <router-link :to="{ name: 'UserPosts' }">Mypage</router-link>
          </li>
        </ul>
        <span
          :class="{ 'text-[#FCF5EE]': click }"
          class="material-symbols-outlined md:hidden cursor-pointer z-20"
          @click="click = !click"
        >
          menu
        </span>
        <ul
          v-if="click"
          :class="{ hidden: !click }"
          class="bg-[#a3001b] absolute left-0 top-0 w-full p-10 rounded-b-3xl space-y-10 text-[#FCF5EE] font-semibold text-center uppercase shadow-sm duration-300"
        >
          <li class="hover:scale-110 duration-200 py-3 rounded-lg">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="hover:scale-110 py-3 duration-200 rounded-lg">
            <router-link :to="{ name: 'AllPosts' }">Post</router-link>
          </li>
          <li v-if="user" class="hover:scale-110 py-3 duration-200 rounded-lg">
            <router-link :to="{ name: 'CreatePost' }">Create</router-link>
          </li>
          <li class="hover:scale-110 py-3 duration-200 rounded-lg">
            <button v-if="user" @click="handleClick">LOGOUT</button>
            <router-link v-else :to="{ name: 'Login' }">LOGIN</router-link>
          </li>
          <li v-if="!user" class="hover:scale-110 py-3 duration-200 rounded-lg">
            <router-link :to="{ name: 'Signup' }">Signup</router-link>
          </li>
          <li class="hover:scale-110 py-3 duration-200 rounded-lg">
            <a id="hLink" href="#works" @click="click = !click">My</a>
          </li>
          <li v-if="user" class="hover:scale-110 py-3 duration-200 rounded-lg">
            <router-link :to="{ name: 'UserPosts' }">Mypage</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";

import useLogout from "../composables/useLogout";
import { watchEffect } from "@vue/runtime-core";

export default {
  setup() {
    const currentPath = ref("");
    const isHome = ref(false);

    const click = ref(false);
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    watchEffect(() => {
      currentPath.value = router.currentRoute.value.fullPath;

      if (currentPath.value == "/" || currentPath.value.includes("#")) {
        isHome.value = true;
      } else {
        isHome.value = false;
      }
      console.log(currentPath.value);
    });

    const toLogin = () => {
      router.push({ name: "Login" });
    };

    const handleClick = async () => {
      await logout();
      console.log("user logged out");
      router.push({ name: "Login" });
    };

    return { user, click, toLogin, handleClick, currentPath, isHome };
  },
};
</script>
