<template>
  <div class="flex flex-col">
    <div>
      <div class="flex flex-row justify-center">
        <label class="w-1/2 text-right">名前：</label>
        <input class="w-1/2" type="text" v-model="counter.name" />
      </div>
      <div class="flex flex-row justify-center">
        <label class="w-1/2 text-right">略称：</label>
        <input class="w-1/2" type="text" v-model="counter.showText" />
      </div>
      <div class="flex flex-row justify-center">
        <label class="w-1/2 text-right">パワー修正値：</label>
        <div class="w-1/2">
          <input class="w-10" type="text" v-model="counter.powerBonus" />
          <input type="range" v-model="counter.powerBonus" min="0" max="9" />
        </div>
      </div>
      <div class="flex flex-row justify-center">
        <label class="w-1/2 text-right">タフネス修正値：</label>
        <div class="w-1/2">
          <input class="w-10" type="text" v-model="counter.toughnessBonus" />
          <input type="range" v-model="counter.toughnessBonus" min="0" max="9" />
        </div>
      </div>
      <div class="flex flex-row justify-around">
        <button @click="handleOkButtonClick">OK</button>
        <button @click="handleCancelButtonClick">Calcel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';

  export default {
    data() {
      return {
        counter: Counter.create("", "", 0, 0),
      }
    },
    methods: {
      handleOkButtonClick() {
        this.$emit('counterCreated', this.getCounter());
        this.$emit('end');
      },
      handleCancelButtonClick() {
        this.$emit('end');
      },
      getCounter(): Counter {
        return this.counter;
      },
    }
  }
</script>