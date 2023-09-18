<template>
  <div class="flex flex-col">
    <div>
      <div class="flex flex-row justify-center">
        <label class="w-1/3 text-right">名前：</label>
        <input class="w-2/3" type="text" v-model="creature.name" />
      </div>
      <div class="flex flex-row justify-center">
        <label class="w-1/3 text-right">パワー：</label>
        <div class="w-2/3">
          <input class="w-10" type="text" v-model="creature.power" />
          <input type="range" v-model="creature.power" min="0" max="9" />
        </div>
      </div>
      <div class="flex flex-row justify-center">
        <label class="w-1/3 text-right">タフネス：</label>
        <div class="w-2/3">
          <input class="w-10" type="text" v-model="creature.toughness" />
          <input type="range" v-model="creature.toughness" min="0" max="9" />
        </div>
      </div>
      <div class="flex flex-row justify-center">
        <label class="w-1/3 text-right">能力：</label>
        <input class="w-2/3" type="text" v-model="creature.ability" />
      </div>
    </div>
    <div class="flex flex-row justify-around">
      <button @click="handleOkButtonClick">OK</button>
      <button @click="handleCancelButtonClick">Calcel</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';

  export default {
    data() {
      return {
        creature: Creature.create("", 1, 1, ""),
      }
    },
    methods: {
      handleOkButtonClick() {
        this.$emit('creatureCreated', this.getCreature());
        this.$emit('end');
      },
      handleCancelButtonClick() {
        this.$emit('end');
      },
      getCreature(): Creature {
        //this.creatureをそのまま返すと、パワーとタフネスがstringになっている場合があるので作成しなおす
        return Creature.create(this.creature.name, Number(this.creature.power), Number(this.creature.toughness), this.creature.ability);
      }
    }
  }
</script>