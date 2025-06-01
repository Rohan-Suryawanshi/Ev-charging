<template>
  <div class="map-view-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">🗺️ Charger Map View</h1>

    <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200">
      <MapView :chargers="chargers" @charger-click="showChargerDetails" />
    </div>

    <!-- Modal for Charger Details -->
    <ChargerDetailsModal v-if="selectedCharger" :charger="selectedCharger" @close="selectedCharger = null" />
  </div>
</template>


<script>
import MapView from '../components/MapView.vue';
import ChargerDetailsModal from '../components/ChargerDetailsModal.vue';
import { mapState } from 'vuex';

export default {
  components: {
    MapView,
    ChargerDetailsModal,
  },
  data() {
    return {
      selectedCharger: null,
    };
  },
  computed: {
    ...mapState(['chargers']),
  },
  methods: {
    showChargerDetails(charger) {
      this.selectedCharger = charger;
    },
  },
  created() {
    this.$store.dispatch('fetchChargers');
  },
};
</script>

<style scoped>

</style>