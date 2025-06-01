<template>
  <div class="w-full h-[650px] p-5" id="map"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';

const evIcon = L.icon({
  iconUrl: '/ev-charger.png', 
  iconSize: [40, 40],         
  iconAnchor: [20, 40],      
  popupAnchor: [0, -40]       
});

const chargers = ref([]);

onMounted(async () => {
  const res = await fetch('https://ev-charging-three.vercel.app/api/v1/stations');
  const data = await res.json();
  chargers.value = data.data || [];

  const map = L.map('map').setView([28.6139, 77.2090], 5); // Default to India

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  chargers.value.forEach(charger => {
    if (charger.location && charger.location.latitude && charger.location.longitude) {
      const marker = L.marker(
        [charger.location.latitude, charger.location.longitude],
        { icon: evIcon }
      ).addTo(map);

      marker.bindPopup(`
        <b>${charger.name}</b><br>
        Status: ${charger.status || 'Unknown'}<br>
        Power: ${charger.powerOutput} kW<br>
        Connector: ${charger.connectorType}
      `);
    }
  });
});
</script>
