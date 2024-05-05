<template>
  <div>
    <Toast />
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

    <div class="find">
      <p>I want to find:</p>
      <Dropdown
        v-model="selected"
        :options="options"
        optionLabel="label"
        placeholder="Select an option"
      />
    </div>

    <div class="compute">
      <InputGroup>
        <InputNumber
          v-model="voltage"
          @input="updateVoltage"
          placeholder="Voltage"
          :maxFractionDigits="5"
          :disabled="voltageDisabled"
        />
        <InputGroupAddon>
          <Dropdown
            class="hide-trigger"
            v-model="voltageUnit"
            :options="voltageOptions"
            optionLabel="code"
          />
        </InputGroupAddon>
        <InputGroupAddon v-if="voltageDisabled && selected != null">
          <Button icon="pi pi-copy" @click="copyToClipboard('V')" />
        </InputGroupAddon>
      </InputGroup>
      <p>=</p>
      <InputGroup>
        <InputNumber
          v-model="current"
          @input="updateCurrent"
          placeholder="Current"
          :maxFractionDigits="5"
          :disabled="currentDisabled"
        />
        <InputGroupAddon>
          <Dropdown
            class="hide-trigger"
            v-model="currentUnit"
            :options="currentOptions"
            optionLabel="code"
          />
        </InputGroupAddon>
        <InputGroupAddon v-if="currentDisabled && selected != null">
          <Button icon="pi pi-copy" @click="copyToClipboard('I')" />
        </InputGroupAddon>
      </InputGroup>
      <p>&times;</p>
      <InputGroup>
        <InputNumber
          v-model="resistance"
          @input="updateResistance"
          placeholder="Resistance"
          :maxFractionDigits="5"
          :disabled="resistanceDisabled"
        />
        <InputGroupAddon>
          <Dropdown
            class="hide-trigger"
            v-model="resistanceUnit"
            :options="resistanceOptions"
            optionLabel="code"
          />
        </InputGroupAddon>
        <InputGroupAddon v-if="resistanceDisabled && selected != null">
          <Button icon="pi pi-copy" @click="copyToClipboard('R')" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  </div>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const voltage = ref(0);
const current = ref(0);
const resistance = ref(0);

const options = ref([
  { label: "Voltage", code: "V" },
  { label: "Current", code: "I" },
  { label: "Resistance", code: "R" },
]);

const voltageUnit = ref({ code: "V", multiplier: 1 });
const voltageOptions = ref([
  { code: "mV", multiplier: 0.001 },
  { code: "V", multiplier: 1 },
  { code: "kV", multiplier: 1000 },
]);
const currentUnit = ref({ code: "A", multiplier: 1 });
const currentOptions = ref([
  { code: "uA", multiplier: 0.000001 },
  { code: "mA", multiplier: 0.001 },
  { code: "A", multiplier: 1 },
]);
const resistanceUnit = ref({ code: "Ω", multiplier: 1 });
const resistanceOptions = ref([
  { code: "Ω", multiplier: 1 },
  { code: "kΩ", multiplier: 1000 },
  { code: "MΩ", multiplier: 1000000 },
]);

// unit converted values
const baseVoltage = computed(
  () => voltage.value * voltageUnit.value.multiplier
);
const baseCurrent = computed(
  () => current.value * currentUnit.value.multiplier
);
const baseResistance = computed(
  () => resistance.value * resistanceUnit.value.multiplier
);

const selected = ref(null);
// disable
const voltageDisabled = computed(
  () => selected.value?.code === "V" || !selected.value
);
const currentDisabled = computed(
  () => selected.value?.code === "I" || !selected.value
);
const resistanceDisabled = computed(
  () => selected.value?.code === "R" || !selected.value
);

const updateVoltage = (e) => {
  voltage.value = e.value;
};

const updateCurrent = (e) => {
  current.value = e.value;
};

const updateResistance = (e) => {
  resistance.value = e.value;
};

// compute desired variable
watchEffect(() => {
  if (selected.value?.code === "V") {
    voltage.value =
      (baseCurrent.value * baseResistance.value) / voltageUnit.value.multiplier;
  } else if (selected.value?.code === "I") {
    current.value =
      baseVoltage.value / baseResistance.value / currentUnit.value.multiplier;
  } else if (selected.value?.code === "R") {
    resistance.value =
      baseVoltage.value / baseCurrent.value / resistanceUnit.value.multiplier;
  }
});

const copyToClipboard = (code) => {
  let valueToCopy = "";

  if (code === "V") {
    valueToCopy = voltage.value;
  } else if (code === "I") {
    valueToCopy = current.value;
  } else if (code === "R") {
    valueToCopy = resistance.value;
  }

  if (valueToCopy !== "") {
    navigator.clipboard.writeText(valueToCopy.toString());
  }
  toast.add({
    severity: "success",
    summary: "Copied!",
    life: 3000,
  });
};
</script>

<style scoped>
.compute {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
}
@media (max-width: 600px) {
  .compute {
    flex-direction: column;
    align-items: center;
    gap: 0.1rem;
  }
}
.find {
  display: flex;
  align-items: center;
  gap: 1rem;
}

::v-deep .hide-trigger .p-dropdown-trigger {
  display: none;
}
</style>
