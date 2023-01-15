<template>
  <section class="bg-[#FCF5EE] min-h-screen flex items-center justify-center">
    <!-- login container -->
    <div class="max-w-5xl p-5 items-center">
      <!-- form -->
      <div class="px-8 md:px-16">
        <h2 class="font-bold text-xl md:text-2xl lg:text-3xl text-[#a3001b]">
          Login
        </h2>
        <p class="hidden md:block text-xs mt-4 text-[#3d000c]">
          If you are already a member, easily log in
        </p>

        <form
          action=""
          class="flex flex-col gap-4"
          @submit.prevent="handleSubmit"
        >
          <input
            class="p-2 mt-8 rounded-xl border"
            type="email"
            v-model="email"
            name="email"
            placeholder="Email"
          />
          <div class="relative">
            <input
              class="p-2 rounded-xl border w-full"
              type="password"
              v-model="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button
            class="bg-[#a3001b] rounded-xl text-white py-2 hover:scale-105 duration-300"
            v-if="!isPending"
          >
            Login
          </button>
          <button
            class="bg-[#a3001b] rounded-xl text-white py-2 hover:scale-105 duration-300"
            v-if="isPending"
            disabled
          >
            Loading...
          </button>
        </form>

        <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
          <hr class="border-gray-400" />
          <p class="text-center text-sm">OR</p>
          <hr class="border-gray-400" />
        </div>

        <div
          class="mt-3 text-xs flex justify-between items-center text-[#3d000c]"
        >
          <p>Don't have an account?</p>
          <router-link
            :to="{ name: 'Signup' }"
            class="py-2 px-5 underline font-semibold text-[#3d000c] hover:scale-105"
          >
            Register
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from "vue-router";
import useLogin from "../../composables/useLogin";
import { ref } from "vue";
import getUser from "../../composables/getUser";
export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const { user } = getUser();
    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
        console.log(user);
      }
    };
    return { email, password, handleSubmit, error, isPending, user };
  },
};
</script>

<style></style>
