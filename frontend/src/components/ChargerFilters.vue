<template>
  <div class="bg-white shadow-md rounded-xl p-6 mt-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">🔍 Filter Chargers</h2>

    <form @submit.prevent="applyFilters" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Status Filter -->
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select v-model="filters.status" id="status"
          class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white transition">
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>


      <!-- Power Output Filter -->
      <div>
        <label for="powerOutput" class="block text-sm font-medium text-gray-700 mb-1">Power Output</label>
        <select v-model="filters.powerOutput" id="powerOutput"
          class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white transition">
          <option value="">All</option>
          <option value="low">Low (≤ 50 kW)</option>
          <option value="medium">Medium (51–150 kW)</option>
          <option value="high">High (> 150 kW)</option>
        </select>
      </div>

      <!-- Connector Type Filter -->
      <div>
        <label for="connectorType" class="block text-sm font-medium text-gray-700 mb-1">Connector Type</label>
        <select v-model="filters.connectorType" id="connectorType"
          class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white transition">
          <option value="">All</option>
          <option value="Type1">Type 1</option>
          <option value="Type2">Type 2</option>
          <option value="CCC">CCS</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="sm:col-span-2 lg:col-span-3 mt-4 flex justify-end">
        <button type="submit" class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow">
          Apply Filters
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        status: '',
        powerOutput: '',
        connectorType: ''
      }
    };
  },
  methods: {
    applyFilters() {
      this.$emit('filter-chargers', { ...this.filters });
    }
  }
};
</script>
