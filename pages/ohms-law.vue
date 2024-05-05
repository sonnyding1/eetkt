<template>
  <div>
    <h1 class="text-red-500">Ohm's Law</h1>
    <p>
      Ohm's Law states that the current through a conductor between two points
      is directly proportional to the voltage across the two points.
    </p>
    <p>Ohm's Law is given by the formula:</p>
    <p>V = IR</p>
    <p>Where:</p>
    <ul>
      <li>V is the voltage</li>
      <li>I is the current</li>
      <li>R is the resistance</li>
    </ul>
    <InputNumber v-model="voltage" placeholder="Voltage" />
  </div>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";

const voltage = ref(0);
</script>

<style></style>
