<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-evenly">
      <label>{{ withStatusCreature.name }}</label>
      <label>{{ withStatusCreature.getPowerToughnessText() }}</label>
    </div>
    <label>{{ withStatusCreature.ability }}</label>
    <div class="flex flex-row justify-evenly" v-for="counterCount in counterCountList">
      <button @click="decreseCounter(counterCount)" class="red-button">-</button>
      <label>{{ counterCount.counter.name }}</label>
      <label>{{ "x" + counterCount.count.toString() }}</label>
      <button @click="increseCounter(counterCount)" class="blue-button">+</button>
    </div>
    <div class="flex flex-row justify-evenly">
      <button class="gray-button" @click="handleOkButtonClick">OK</button>
      <button class="gray-button" @click="handleCancelButtonClick">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import CounterCount from '@/components/classes/counter_count.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';

  export default {
    props: {
        withStatusCreature: {
            type: WithStatusCreature,
            required: true,
        },
    },
    data() {
      const counterCountList: CounterCount[] = [];
      return {
        counterCountList,
      }
    },
    mounted() {
      this.initCreatureCounts();
    },
    methods: {
      initCreatureCounts(): void {
        this.counterCountList.splice(0);
        const counters = this.withStatusCreature.status.counters;
        const counterHashSet = this.getCounterHashSet(counters);
        counterHashSet.forEach(c => {
          this.counterCountList.push(new CounterCount(c, this.getCounterCount(counters, c)));
        });
      },
      getCounterHashSet(counters: Counter[]): Counter[] {
        const list: Counter[] = [];
        counters.forEach(counter => {
          if (!list.some(x => x.equals(counter)))
          {
            list.push(counter);
          }
        });
        return list;
      },
      getCounterCount(counters: Counter[], counter: Counter): number {
        return counters.filter(x => x.equals(counter)).length;
      },
      increseCounter(counterCount: CounterCount): void {
        counterCount.count += 1;
      },
      decreseCounter(counterCount: CounterCount): void {
        if (counterCount.count > 0) {
          counterCount.count -= 1;
        }
      },
      handleOkButtonClick() {
        this.$emit('counterCountsEdited', this.counterCountList);
        this.$emit('end');
      },
      handleCancelButtonClick() {
        this.$emit('end');
      },
    },
  }
</script>