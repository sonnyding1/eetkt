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

    <p>I want to find:</p>
    <Dropdown
      v-model="selected"
      :options="options"
      optionLabel="label"
      placeholder="Select an option"
    />

    <div class="compute">
      <InputGroup>
        <InputNumber
          v-model="voltage"
          @input="updateVoltage"
          placeholder="Voltage"
          :maxFractionDigits="5"
        />
        <InputGroupAddon>V</InputGroupAddon>
      </InputGroup>
      <p>=</p>
      <InputGroup>
        <InputNumber
          v-model="current"
          @input="updateCurrent"
          placeholder="Current"
          :maxFractionDigits="5"
        />
        <InputGroupAddon>A</InputGroupAddon>
      </InputGroup>
      <p>&times;</p>
      <InputGroup>
        <InputNumber
          v-model="resistance"
          @input="updateResistance"
          placeholder="Resistance"
          :maxFractionDigits="5"
        />
        <InputGroupAddon>Ω</InputGroupAddon>
      </InputGroup>
    </div>
    <p>{{ selected }}</p>
  </div>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Dropdown from "primevue/dropdown";

import { ref } from "vue";

const voltage = ref(0);
const current = ref(0);
const resistance = ref(0);

const options = ref([
  { label: "Voltage", code: "V" },
  { label: "Current", code: "I" },
  { label: "Resistance", code: "R" },
]);

const selected = ref(null);

const updateVoltage = (e) => {
  voltage.value = e.value;
};

const updateCurrent = (e) => {
  current.value = e.value;
};

const updateResistance = (e) => {
  resistance.value = e.value;
};
</script>

<style scoped>
.compute {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
}
</style>
