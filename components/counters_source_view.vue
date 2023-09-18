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
  <button class="gray-button" @click="showModal">作成</button>
  <!-- モーダル -->
  <modalView :show="showingModal">
    <NewCounterView @end="closeModal" @counterCreated="appendCounter"/>
  </modalView>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import Global from '@/components/classes/global.ts';

  interface CreatureSourceInfo {
    counterList: Counter[],
    showingModal: boolean,
  }

  export default {
    props: {
        cookieKey: {
            type: String,
            required: false,
        },
    },
    data(): CreatureSourceInfo {
      return {
        counterList: [],
        showingModal: false,
      }
    },
    watch: {
      counterList: {
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
          this.counterList = temp.filter(x => Counter.canConvert(x))
                                  .map(x => Counter.convert(x));
        }
      }catch {
        //
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
      getCounterList(): Counter[] {
        return this.counterList
      },
    },
  }
</script>