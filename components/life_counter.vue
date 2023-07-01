<template>
  <button @click="decreaseLife(5)">-5</button>
  <button @click="decreaseLife(1)">-</button>
  <label>{{ life }}</label>
  <button @click="increaseLife(1)">+</button>
  <button @click="increaseLife(5)">+5</button>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        life: 20
      };
    },
    methods: {
      increaseLife(value:number): void {
        this.life += value;
      },
      decreaseLife(value:number): void {
        this.life -= value;
      },
    },
  };
</script>