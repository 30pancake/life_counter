<template>
  <ul>
    <li v-for="(counter, key) in counterList" draggable="true"
      @dragstart="counterDragStartHandler($event, key)">{{ counter.name }}</li>
  </ul>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';

  export default {
    data() {
      return {
        counterList: {
          1 : Counter.create('+1/+1', "+1", 1, 1),
          2 : Counter.create('毒カウンター', "毒", 0, 0),
        },
      }
    },
    methods: {
      counterDragStartHandler(event: DragEvent, counterListKey: number) {
        if (counterListKey in this.counterList) {
          let counter = this.counterList[counterListKey];
          let dataText = JSON.stringify(counter);
          event.dataTransfer?.setData('dataText', dataText);
        }
      },
    },
  }
</script>