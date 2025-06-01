<template>
  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8 font-sans">
    <div class="flex flex-col items-center justify-center w-full sm:max-w-md">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        Ev Charging
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Username</label>
              <input
                v-model="username"
                type="text"
                id="username"
                required
                placeholder="Enter your username"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
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
              Sign in
            </button>
            <p v-if="errorMessage" class="text-sm text-red-500 text-center mt-2">{{ errorMessage }}</p>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Don’t have an account yet?
              <router-link to="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</router-link>
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
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      try {
        const response = await fetch("https://ev-charging-three.vercel.app/api/v1/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          this.errorMessage = result.message || "Login failed. Please check your credentials.";
          return;
        }

        // Save tokens & user info as needed
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        // Redirect to dashboard or home
        this.$router.push("/chargers");
      } catch (err) {
        this.errorMessage = err.message || "An error occurred during login.";
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
