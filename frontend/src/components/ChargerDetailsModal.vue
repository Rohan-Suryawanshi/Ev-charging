<template>
  <div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" @click.self="close">
    <div class="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Charger Details</h2>
      <ul class="space-y-2 text-sm text-gray-700">
        <li><strong>ID:</strong> {{ charger.id }}</li>
        <li><strong>Name:</strong> {{ charger.name }}</li>
        <li><strong>Status:</strong> {{ charger.status }}</li>
        <li><strong>Power Output:</strong> {{ charger.powerOutput }} kW</li>
        <li><strong>Connector Type:</strong> {{ charger.connectorType }}</li>
        <li><strong>Location:</strong> {{ charger.location }}</li>
      </ul>
      <button @click="close" class="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  charger: Object,
});
const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>
