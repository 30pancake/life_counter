<template>
  <table>
    <tbody>
      <tr v-for="counter in counterList" draggable="true" @dragstart="counterDragStartHandler($event, counter)">
        <td>{{ counter.name }}</td>
        <td>
          <button class="gray-button" @click="deleteCounter(counter)">削除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="gray-button" @click="showModal">追加</button>
  <!-- モーダル -->
  <modalView :show="showingModal">
    <NewCounterView @end="closeModal" @counterCreated="appendCounter"/>
  </modalView>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import Global from '@/components/classes/global.ts';

  export default {
    data() {
      return {
        counterList: [
          Counter.create("+1", 1, 1),
          Counter.create("毒", 0, 0),
        ],
        showingModal: false,
      }
    },
    methods: {
      counterDragStartHandler(event: DragEvent, counter: Counter) {
        Global.setObjectDataToDragEvent(event, counter);
      },
      appendCounter(counter: Counter): void {
        this.counterList.push(counter);
      },
      deleteCounter(counter: Counter): void {
        const deleteIndex = this.counterList.findIndex(x => x.equals(counter));
        if (deleteIndex > -1 && confirm("選択したカウンターを削除します。よろしいですか？")) {
          this.counterList.splice(deleteIndex, 1);
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