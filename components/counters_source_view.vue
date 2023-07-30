<template>
  <ul>
    <li v-for="counter in counterList" draggable="true"
      @dragstart="counterDragStartHandler($event, counter)">{{ counter.name }}
    </li>
    <button class="gray-button" @click="showModal()">追加</button>
  </ul>
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
      showModal(): void {
        this.showingModal = true;
      },
      closeModal(): void {
        this.showingModal = false;
      },
    },
  }
</script>