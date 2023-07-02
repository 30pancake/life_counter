<template>
  <ul>
    <li v-for="counter in counterList" draggable="true">{{ counter.name }}</li>
  </ul>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        counterList: [
        {
          name: '+1/+1 カウンター',
          showText: "+1/+1",
        },
        {
          name: '毒カウンター',
          showText: "毒",
        },
        ]
      }
    },
  }
</script>