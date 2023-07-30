<template>
  <ul>
    <li v-for="creature in creatureList" draggable="true"
      @dragstart="creatureDragStartHandler($event, creature)">{{ creature.name + " " + creature.getPowerToughnessText() }}
    </li>
    <button class="gray-button" @click="handleAppendButtonClick()">追加</button>
  </ul>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';
  import Global from '@/components/classes/global.ts';

  export default {
    data() {
      return {
        creatureList: [
          Creature.create("人間", 1, 1, ""),
          Creature.create("狼", 2, 2, ""),
          Creature.create("鳥", 1, 1, "飛行"),
        ],
      }
    },
    methods: {
      creatureDragStartHandler(event: DragEvent, creature: Creature) {
        Global.setObjectDataToDragEvent(event, creature);
      },
      appendCreature(creature: Creature): void {
        this.creatureList.push(creature);
      },
      handleAppendButtonClick(): void {
        this.$emit('appendCreatureRequired');
      },
    },
  }
</script>