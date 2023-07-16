<template>
  <div @drop="dropHandler($event)" @dragover.prevent>
    <div>
      <button @click="decreaseLife(5)">-5</button>
      <button @click="decreaseLife(1)">-</button>
      <label>{{ life }}</label>
      <button @click="increaseLife(1)">+</button>
      <button @click="increaseLife(5)">+5</button>
    </div>
    <div v-for="[counter, count] in getGroupedCounters">
      <button @click="decreseCounter(counter)">-</button>
      <label>{{ getCounterText(counter, count) }}</label>
      <button @click="increseCounter(counter)">+</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import Global from '@/components/classes/global.ts';

  interface LifeCounterInfo {
    life: number,
    counters: Counter[],
  }
  export default {
    data(): LifeCounterInfo {
      return {
        life: 20,
        counters: [],
      };
    },
    computed: {
      getGroupedCounters(): Map<Counter, number> {
        let groupedCounters: Map<Counter, number> = new Map();
        this.counters.forEach(counter => {
          let keyCounter = Array.from(groupedCounters.keys()).find(x => x.equals(counter));
          if (keyCounter != undefined) {
            groupedCounters.set(keyCounter, groupedCounters.get(keyCounter) + 1);
          } else {
            groupedCounters.set(counter, 1);
          }
        });
        return groupedCounters;
      },
    },

    methods: {
      setLife(value:number): void {
        this.life = value
      },
      increaseLife(value:number): void {
        this.life += value;
      },
      decreaseLife(value:number): void {
        this.life -= value;
      },
      getCounterText(counter: Counter, count: number): string {
        return counter.showText + " x" + count.toString();
      },
      increseCounter(counter: Counter): void {
        this.counters.push(counter);
      },
      decreseCounter(counter: Counter): void {
        let index = this.counters.findLastIndex(x => counter.equals(x));
        if (index > -1) {
          this.counters.splice(index, 1);
        }
      },
      dropHandler(event: DragEvent): void {
        let counter = Global.getObjectDataFromDragEvent(event, Counter.parseJson);
        this.counters.push(counter);
      },
    },
  };
</script>