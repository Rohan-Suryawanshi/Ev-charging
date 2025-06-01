<template>
  <section class="bg-gray-50 dark:bg-gray-900 font-sans">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Ev Charging
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Create your account
          </h1>
          <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Username
              </label>
              <input
                v-model="username"
                type="text"
                id="username"
                required
                placeholder="Your username"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Email
              </label>
              <input
                v-model="email"
                type="email"
                id="email"
                required
                placeholder="name@company.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
                Password
              </label>
              <input
                v-model="password"
                type="password"
                id="password"
                required
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Account
            </button>
            <p v-if="successMessage" class="text-sm text-green-500 text-center">{{ successMessage }}</p>
            <p v-if="errorMessage" class="text-sm text-red-500 text-center">{{ errorMessage }}</p>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link to="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign in</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      this.successMessage = "";
      this.errorMessage = "";

      try {
        const response = await fetch("http://localhost:3000/api/v1/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Registration failed");
        }

        this.successMessage = result.message;
        this.username = "";
        this.email = "";
        this.password = "";

        // Optional: Redirect to login page after 2 seconds
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (err) {
        this.errorMessage = err.message;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
