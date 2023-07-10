<template>
  <ul>
    <li v-for="(creature, key) in creatureList" draggable="true"
      @dragstart="creatureDragStartHandler($event, key)">{{ creature.name }}</li>
  </ul>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';

  export default {
    data() {
      return {
        creatureList: {
          1 : Creature.create("人間", 1, 1, ""),
          2 : Creature.create("狼", 2, 2, ""),
          3 : Creature.create("鳥", 1, 1, "飛行"),
        },
      }
    },
    methods: {
      creatureDragStartHandler(event: DragEvent, creatureListKey: number) {
        if (creatureListKey in this.creatureList) {
          let creature = this.creatureList[creatureListKey];
          let dataText = JSON.stringify(creature);
          event.dataTransfer?.setData('dataText', dataText);
        }
      },
    },
  }
</script>