<template>
  <div class="max-w-7xl mx-auto py-12 px-6">
    <div class="flex justify-end mb-6">
      <button @click="addCharger"
        class="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Charger
      </button>
      <button @click="goToMap"
        class="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition ml-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z" />
        </svg>
        Map
      </button>

    </div>

    <h1 class="text-5xl font-extrabold text-center text-gray-900 mb-12">Charger Stations</h1>

    <!-- Filter Component -->
    <ChargerFilters @filter-chargers="fetchChargers" />

    <!-- Charger Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      <div v-for="charger in chargers" :key="charger._id"
        class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-3 truncate" :title="charger.name">
            {{ charger.name }}
          </h2>

          <div class="flex items-center mb-4 space-x-2">
            <span :class="{
              'bg-green-100 text-green-800': charger.status.toLowerCase() === 'active',
              'bg-red-100 text-red-800': charger.status.toLowerCase() !== 'active',
            }" class="inline-block px-3 py-1 rounded-full text-sm font-semibold">
              {{ charger.status }}
            </span>
          </div>

          <ul class="text-gray-700 space-y-1 text-sm">
            <li><strong>Power Output:</strong> {{ charger.powerOutput }} kW</li>
            <li><strong>Connector Type:</strong> {{ charger.connectorType }}</li>
            <li>
              <strong>Location:</strong>
              Lat: {{ charger.location.latitude.toFixed(4) }},
              Lng: {{ charger.location.longitude.toFixed(4) }}
            </li>
          </ul>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button @click="editCharger(charger._id)"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
            aria-label="Edit charger">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3.536z" />
            </svg>
            Edit
          </button>
          <button @click="deleteCharger(charger._id)"
            class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
            aria-label="Delete charger">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- No Data State -->
    <div v-if="chargers.length === 0" class="text-center mt-12 text-gray-500 text-lg">
      No chargers found.
    </div>
  </div>
</template>

<script>
import ChargerFilters from './ChargerFilters.vue';

export default {
  name: 'ChargerStations',
  components: {
    ChargerFilters,
  },
  data() {
    return {
      chargers: [],
    };
  },
  methods: {
    addCharger() {
      this.$router.push({ name: 'ChargerForm' });
    },
    goToMap() {
      this.$router.push({ name: 'MapView' }); // replace 'MapView' with your actual route
    },
    fetchChargers(filters = {}) {
      const queryParams = new URLSearchParams();

      if (filters.status) queryParams.append('status', filters.status);
      if (filters.powerOutput) queryParams.append('powerOutput', filters.powerOutput);
      if (filters.connectorType) queryParams.append('connectorType', filters.connectorType);

      const url = `https://ev-charging-three.vercel.app/api/v1/stations/filter?${queryParams.toString()}`;

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.chargers = data?.data || [];
        })
        .catch((error) => {
          console.error('Error fetching chargers:', error);
        });
    },
    editCharger(id) {
      this.$router.push({ name: 'ChargerForm', params: { id } });
    },
    deleteCharger(id) {
      if (!confirm('Are you sure you want to delete this charger?')) return;

      const token = localStorage.getItem('accessToken'); 

      fetch(`https://ev-charging-three.vercel.app/api/v1/stations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to delete charger');
          this.fetchChargers();
        })
        .catch((error) => {
          console.error('Error deleting charger:', error);
        });
    },
  },
  mounted() {
    this.fetchChargers();
  },
};
</script>
