<template>
  <table>
    <tbody>
      <tr v-for="creature in creatureList" draggable="true" @dragstart="creatureDragStartHandler($event, creature)">
        <td>{{ creature.name + " " + creature.getPowerToughnessText() }}</td>
        <td>
          <button class="gray-button" @click="requireMakeCreature(creature)">追加</button>
        </td>
        <td>
          <button class="gray-button" @click="deleteCreature(creature)">削除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="gray-button" @click="showModal">作成</button>
  <!-- モーダル -->
  <modalView :show="showingModal">
    <NewCreatureView @end="closeModal" @creatureCreated="appendCreature"/>
  </modalView>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';
  import Global from '@/components/classes/global.ts';

  interface CreatureSourceInfo {
    creatureList: Creature[],
    showingModal: boolean,
  }

  export default {
    emits: ['makeCreatureRequired'],

    props: {
        cookieKey: {
            type: String,
            required: true,
        },
    },
    data(): CreatureSourceInfo {
      return {
        creatureList: [],
        showingModal: false,
      }
    },
    watch: {
      creatureList: {
        handler(newVal) {
          try {
            Global.setToCookie(this.cookieKey, newVal);
          } catch {
            //
          }
        },
        deep: true,
      },
    },
    mounted() {
      try {
        const temp = Global.getFromCookie(this.cookieKey);
        if (temp instanceof Array) {
          this.creatureList = temp.filter(x => Creature.canConvert(x))
                                  .map(x => Creature.convert(x));
        }
      }catch {
        //
      }
    },
    methods: {
      creatureDragStartHandler(event: DragEvent, creature: Creature) {
        Global.setObjectDataToDragEvent(event, creature);
      },
      requireMakeCreature(creature: Creature): void {
        this.$emit('makeCreatureRequired', creature);
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