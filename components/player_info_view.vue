<template>
  <div class="flex" @drop="dropHandler($event)" @dragover.prevent>
    <div class="flex justify-center items-center">
      <div>
        <button class="red-button short" @click="decreaseLife(5)">-5</button>
        <button class="red-button short" @click="decreaseLife(1)">-</button>
        <label>{{ life }}</label>
        <button class="blue-button short" @click="increaseLife(1)">+</button>
        <button class="blue-button short" @click="increaseLife(5)">+5</button>
      </div>
    </div>
    <div>
      <div v-for="[counter, count] in getGroupedCounters">
        <button class="red-button short" @click="decreseCounter(counter)">-</button>
        <label class="middle">{{ getCounterText(counter, count) }}</label>
        <button class="blue-button short" @click="increseCounter(counter)">+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import Global from '@/components/classes/global.ts';

  interface PlayerInfo {
    life: number,
    counters: Counter[],
  }
  export default {
    data(): PlayerInfo {
      return {
        life: 20,
        counters: [],
      };
    },
    computed: {
      getGroupedCounters(): Map<Counter, number> {
        return Global.countGroup(this.counters);
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