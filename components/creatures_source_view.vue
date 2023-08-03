<template>
  <table>
    <tbody>
      <tr v-for="creature in creatureList" draggable="true" @dragstart="creatureDragStartHandler($event, creature)">
        <td>{{ creature.name + " " + creature.getPowerToughnessText() }}</td>
        <td>
          <button class="gray-button" @click="deleteCreature(creature)">削除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="gray-button" @click="showModal">追加</button>
  <!-- モーダル -->
  <modalView :show="showingModal">
    <NewCreatureView @end="closeModal" @creatureCreated="appendCreature"/>
  </modalView>
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
        showingModal: false,
      }
    },
    methods: {
      creatureDragStartHandler(event: DragEvent, creature: Creature) {
        Global.setObjectDataToDragEvent(event, creature);
      },
      appendCreature(creature: Creature): void {
        this.creatureList.push(creature);
      },
      deleteCreature(creature: Creature): void {
        const deleteIndex = this.creatureList.findIndex(x => x.equals(creature));
        if (deleteIndex > -1 && confirm("選択したクリーチャーを削除します。よろしいですか？")) {
          this.creatureList.splice(deleteIndex, 1);
        }
      },
      showModal(): void {
        this.showingModal = true;
      },
      closeModal(): void {
        this.showingModal = false;
      },
    },
  }
</script>