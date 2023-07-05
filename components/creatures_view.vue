<template>
  <button @click="decreseCreature">-</button>
  <button @click="increseCreature">+</button>
  <label>{{ creature?.name }}</label>
  <label>{{ powerToughnessText }}</label>
  <label></label>
  <label></label>
  <button @click="allUntap">All</button>
  <button @click="increaseUntap">-</button>
  <button @click="increaseTap">+</button>
  <button @click="allTap">All</button>
</template>

<script lang="ts">
interface CreatureViewInfo {
  creatureCount: number
  tapCount: number
  creature?: Creature
}

  export default {
    data(): CreatureViewInfo {
      return {
        creatureCount: 0,
        tapCount: 0,
        creature: undefined,
      };
    },
    methods: {
      powerToughnessText(): string {
        return this.creature?.power + " / " + this.creature?.toughness
      },
      increseCreature(): void {
        this.creatureCount++
      },
      decreseCreature(): void {
        if (this.creatureCount > 0) {
          this.creatureCount--
        }
      },
      allTap(): void {
        this.tapCount = this.creatureCount
      },
      allUntap(): void {
        this.tapCount = 0
      },
      increaseTap(): void {
        if (this.tapCount < this.creatureCount) {
          this.tapCount++
        }
      },
      increaseUntap(): void {
        if (this.tapCount > 0) {
          this.tapCount--
        }
      },
    }
  }
</script>