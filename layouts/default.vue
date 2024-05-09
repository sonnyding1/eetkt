<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <!-- <h3>EE Toolkit</h3> -->
        <NuxtLink to="/">
          <p class="title">EE Toolkit</p>
        </NuxtLink>
      </template>
      <template #end>
        <NuxtLink to="https://github.com/sonnyding1/eetkt">
          <Button icon="pi pi-github" outlined />
        </NuxtLink>
      </template>
    </Menubar>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Menubar from "primevue/menubar";
import Button from "primevue/button";

const router = useRouter();

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "Tools",
    icon: "pi pi-briefcase",
    items: [
      {
        label: "Ohm's Law",
        command: () => {
          router.push("/ohms-law");
        },
      },
      {
        label: "Voltage Divider",
        command: () => {
          router.push("/voltage-divider-resistors");
        },
      },
    ],
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
    command: () => {
      router.push("/contact");
    },
  },
]);
</script>

<style scoped>
.container {
  min-width: 100%;
  min-height: 100%;
}
.title {
  font-weight: bold;
  color: black;
}
</style>
