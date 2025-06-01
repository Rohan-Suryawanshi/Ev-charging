<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-6 animate-fadeIn">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">
      {{ isEdit ? '✏️ Edit Station' : '➕ Add Station' }}
    </h2>

    <form @submit.prevent="submitForm" class="space-y-5">
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Station Name</label>
        <input v-model="station.name" type="text" class="w-full px-4 py-2 border rounded-lg" required />
      </div>

      <!-- Map Picker -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Select Location on Map</label>
        <div id="map" class="w-full h-64 rounded-xl shadow"></div>
        <div class="mt-2 text-sm text-gray-600">
          Selected: {{ station.location.latitude }}, {{ station.location.longitude }}
        </div>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select v-model="station.status" class="w-full px-4 py-2 border rounded-lg">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Power Output -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Power Output (kW)</label>
        <input v-model.number="station.powerOutput" type="number" class="w-full px-4 py-2 border rounded-lg" required />
      </div>

      <!-- Connector Type -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Connector Type</label>
        <input v-model="station.connectorType" type="text" class="w-full px-4 py-2 border rounded-lg" required />
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-3 pt-4">
        <button type="button" @click="cancel" class="px-4 py-2 border rounded-lg text-gray-600">Cancel</button>
        <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg">Save Station</button>
      </div>
    </form>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
  props: {
    id: String,
  },
  data() {
    return {
      station: {
        name: '',
        location: {
          latitude: null,
          longitude: null,
        },
        status: 'Active',
        powerOutput: null,
        connectorType: '',
      },
      map: null,
      marker: null,
    };
  },
  computed: {
    isEdit() {
      return !!this.id;
    },
  },
  mounted() {
    this.initMap();
    if (this.id) {
      this.fetchStation(this.id);
    }
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([28.6139, 77.2090], 5); // Default center

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      this.map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        this.station.location.latitude = lat;
        this.station.location.longitude = lng;

        if (this.marker) {
          this.marker.setLatLng([lat, lng]);
        } else {
          this.marker = L.marker([lat, lng]).addTo(this.map);
        }
      });
    },
    fetchStation(id) {
      fetch(`https://ev-charging-three.vercel.app/api/v1/stations/${id}`)
        .then((res) => res.json())
        .then((response) => {
          const data = response.data;
          if (!data) {
            throw new Error('Station data not found');
          }
          // Update station reactive data properly
          this.station.name = data.name || '';
          this.station.status = data.status || 'Active';
          this.station.powerOutput = data.powerOutput || null;
          this.station.connectorType = data.connectorType || '';

          if (data.location && data.location.latitude && data.location.longitude) {
            this.station.location.latitude = data.location.latitude;
            this.station.location.longitude = data.location.longitude;

            this.map.setView([data.location.latitude, data.location.longitude], 12);

            if (this.marker) {
              this.marker.setLatLng([data.location.latitude, data.location.longitude]);
            } else {
              this.marker = L.marker([data.location.latitude, data.location.longitude]).addTo(this.map);
            }
          }
        })
        .catch((err) => {
          console.error('Error loading station:', err);
          alert('Failed to load station data');
        });
    },
    submitForm() {
      const apiUrl = this.isEdit
        ? `https://ev-charging-three.vercel.app/api/v1/stations/${this.id}`
        : `https://ev-charging-three.vercel.app/api/v1/stations`;

      const token = localStorage.getItem('accessToken');

      fetch(apiUrl, {
        method: this.isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
        body: JSON.stringify(this.station),
      })
        .then((res) => res.json())
        .then((data) => {
          this.$emit('station-saved', data);
          this.$router.push({ name: 'ChargerListing' });
        })
        .catch((err) => alert('Error: ' + err.message));
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
#map {
  height: 256px;
  width: 100%;
  border-radius: 12px;
}
</style>
