<template>
  <ul>
    <li v-for="counter in counterList" draggable="true"
      @dragstart="counterDragStartHandler($event, counter)">{{ counter.name }}
    </li>
    <button class="gray-button" @click="handleAppendButtonClick()">追加</button>
  </ul>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import Global from '@/components/classes/global.ts';

  export default {
    data() {
      return {
        counterList: [
          Counter.create('+1/+1', "+1", 1, 1),
          Counter.create('毒カウンター', "毒", 0, 0),
        ]
      }
    },
    methods: {
      counterDragStartHandler(event: DragEvent, counter: Counter) {
        Global.setObjectDataToDragEvent(event, counter);
      },
      appendCounter(counter: Counter): void {
        this.counterList.push(counter);
      },
      handleAppendButtonClick(): void {
        this.$emit('appendCounterRequired');
      },
    },
  }
</script>