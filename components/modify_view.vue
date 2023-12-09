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
import Global from '@/components/classes/global.ts';
import ModifyValue from './classes/modify_value';

export default{
  emits: ['modifyValueEdited', 'modifyValueEdited'],

  props: {
    cookieKey: {
        type: String,
        required: true,
    },
  },
  data() {
    return {
      powerModificationValue: 0,
      toughnessModificationValue: 0,
    }
  },
  watch: {
    powerModificationValue(newValue) {
      this.powerModificationValue = newValue;
      Global.setToCookie(this.cookieKey, this.getModifyValue());
      this.$emit('modifyValueEdited', this.getModifyValue());
    },
    toughnessModificationValue(newValue) {
      this.toughnessModificationValue = newValue;
      Global.setToCookie(this.cookieKey, this.getModifyValue());
      this.$emit('modifyValueEdited', this.getModifyValue());
    },
  },
  mounted() {
      try {
        const temp = Global.getFromCookie(this.cookieKey);
        if (ModifyValue.canConvert(temp)) {
          this.powerModificationValue = temp.power;
          this.toughnessModificationValue = temp.toughness;
        }
      }catch {
        //
      }
    },
  methods: {
    getModifyValue(): ModifyValue {
      return ModifyValue.create(this.powerModificationValue, this.toughnessModificationValue);
    },
    getPowerModificationValue(): number {
      return this.powerModificationValue;
    },
    getToughnessModificationValue(): number {
      return this.toughnessModificationValue;
    },
    setModifyValue(modifyValue: ModifyValue): void {
      this.powerModificationValue = modifyValue.power;
      this.toughnessModificationValue = modifyValue.toughness;
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