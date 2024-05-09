<template>
  <div>
    <Toast />
    <h1>Voltage Divider (Resistors)</h1>

    <div>
      <img :src="voltageDividerSvg" alt="voltage-divider" />
    </div>

    <div class="compute">
      <FloatLabel>
        <InputGroup>
          <InputNumber
            v-model="vi"
            @input="updateVi"
            placeholder="Input Voltage"
            :maxFractionDigits="5"
          />

          <InputGroupAddon>
            <Dropdown
              class="hide-trigger"
              v-model="viUnit"
              :options="voltageOptions"
              optionLabel="code"
            />
          </InputGroupAddon>
        </InputGroup>
        <label>Input Voltage</label>
      </FloatLabel>

      <FloatLabel>
        <InputGroup>
          <InputNumber
            v-model="r1"
            @input="updateR1"
            placeholder="R1"
            :maxFractionDigits="5"
          />
          <InputGroupAddon>
            <Dropdown
              class="hide-trigger"
              v-model="r1Unit"
              :options="resistanceOptions"
              optionLabel="code"
            />
          </InputGroupAddon>
        </InputGroup>
        <label>R1</label>
      </FloatLabel>

      <FloatLabel>
        <InputGroup>
          <InputNumber
            v-model="r2"
            @input="updateR2"
            placeholder="R2"
            :maxFractionDigits="5"
          />
          <InputGroupAddon>
            <Dropdown
              class="hide-trigger"
              v-model="r2Unit"
              :options="resistanceOptions"
              optionLabel="code"
            />
          </InputGroupAddon>
        </InputGroup>
        <label>R2</label>
      </FloatLabel>
    </div>
    <FloatLabel>
      <InputGroup>
        <InputNumber v-model="vo" :disabled="true" :maxFractionDigits="5" />
        <InputGroupAddon>
          <Dropdown
            class="hide-trigger"
            v-model="voUnit"
            :options="voltageOptions"
            optionLabel="code"
          />
        </InputGroupAddon>
        <InputGroupAddon>
          <Button icon="pi pi-copy" @click="copyToClipboard()" />
        </InputGroupAddon>
      </InputGroup>
      <label>Output Voltage</label>
    </FloatLabel>
  </div>
</template>

<script setup>
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import FloatLabel from "primevue/floatlabel";
import voltageDividerSvg from "@/assets/voltage-divider.svg";

const toast = useToast();

const r1 = ref(0);
const r2 = ref(0);
const vi = ref(0);
const vo = ref(0);

const viUnit = ref({ code: "V", multiplier: 1 });
const voUnit = ref({ code: "V", multiplier: 1 });
const voltageOptions = ref([
  { code: "mV", multiplier: 0.001 },
  { code: "V", multiplier: 1 },
  { code: "kV", multiplier: 1000 },
]);

const r1Unit = ref({ code: "Ω", multiplier: 1 });
const r2Unit = ref({ code: "Ω", multiplier: 1 });
const resistanceOptions = ref([
  { code: "Ω", multiplier: 1 },
  { code: "kΩ", multiplier: 1000 },
  { code: "MΩ", multiplier: 1000000 },
]);

// unit converted values
const baseVi = computed(() => vi.value * viUnit.value.multiplier);
const baseR1 = computed(() => r1.value * r1Unit.value.multiplier);
const baseR2 = computed(() => r2.value * r2Unit.value.multiplier);

const updateR1 = (e) => {
  r1.value = e.value;
};

const updateR2 = (e) => {
  r2.value = e.value;
};

const updateVi = (e) => {
  vi.value = e.value;
};

watchEffect(() => {
  vo.value =
    ((baseR2.value / (baseR1.value + baseR2.value)) * baseVi.value) /
    voUnit.value.multiplier;
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(vo.value);
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
  margin: 2rem 0;
}
@media (max-width: 600px) {
  .compute {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
</style>
