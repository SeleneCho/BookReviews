<template>
  <div id="contact" class="dark:bg-slate-900">
    <div class="container mx-auto">
      <!-- top -->
      <div class="flex flex-col gap-3 items-center">
        <h1 class="text-[#a3001b] text-2xl font-bold">CONTACT</h1>
        <h1 class="text-3xl text-[#3d000c] dark:text-white">
          Have a Question?
        </h1>
        <p class="w-1/2 text-center text-gray-400">We're here to help!</p>
      </div>
      <!-- bottom -->
      <form class="mt-5 p-8 flex flex-col gap-5 items-center">
        <input
          class="p-2 w-full md:w-1/2 ring-1 ring-[#3d000c] rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
          type="text"
          placeholder="Name Surname"
        />
        <input
          class="p-2 w-full md:w-1/2 ring-1 ring-[#3d000c] rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
          type="email"
          placeholder="Email"
        />
        <textarea
          class="p-2 w-full md:w-1/2 ring-1 ring-[#3d000c] rounded-sm dark:bg-slate-800 dark:ring-0 dark:text-white"
          cols="30"
          rows="10"
          placeholder="Message..."
        ></textarea>
        <button
          class="w-1/2 bg-[#ff99aa] hover:scale-105 duration-300 text-white font-medium px-3 py-2 rounded-md cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>
