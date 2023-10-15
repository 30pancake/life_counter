<template>
  <div class="flex flex-col">
    <label>全体修正</label>
    <div class="flex flex-row justify-around">
      <button class="blue-button" @click="_increasePower(-1)">-</button>
      <label>{{"パワー：" + powerModificationValue}}</label>
      <button class="red-button" @click="_increasePower(1)">+</button>
    </div>
    <div class="flex flex-row justify-around">
      <button class="blue-button" @click="_increaseToughness(-1)">-</button>
      <label>{{"タフネス：" + toughnessModificationValue}}</label>
      <button class="red-button" @click="_increaseToughness(1)">+</button>
    </div>
  </div>
</template>

<script lang="ts">
export default{
  data() {
    return {
      powerModificationValue: 0,
      toughnessModificationValue: 0,
    }
  },
  watch: {
    powerModificationValue(newValue) {
      this.$emit('powerEdited', newValue);
    },
    toughnessModificationValue(newValue) {
      this.$emit('toughnessEdited', newValue);
    },
  },
  methods: {
    getPowerModificationValue(): number {
      return this.powerModificationValue;
    },
    getToughnessModificationValue(): number {
      return this.toughnessModificationValue;
    },

    //private method
    _increasePower(increaseValue: number): void {
      this.powerModificationValue += increaseValue;
    },
    _increaseToughness(increaseValue: number): void {
      this.toughnessModificationValue += increaseValue;
    },
  },
}
</script>