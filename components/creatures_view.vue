<template>
  <div draggable="true" @dragstart="dragStartHandler($event)" @drop="dropHandler($event)" @dragover.prevent>
    <button @click="decreseCreature()">-</button>
    <button @click="increseCreature()">+</button>
    <label>{{ getCreatureName }}</label>
    <label>{{ powerToughnessText }}</label>
    <label>{{ getCounterText }}</label>
    <label>{{ getCreatureCount(false) }}</label>
    <label>{{ getCreatureCount(true) }}</label>
    <button @click="allUntap()">All</button>
    <button @click="increaseUntap()">-</button>
    <button @click="increaseTap()">+</button>
    <button @click="allTap()">All</button>
  </div>
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';
  import Global from '@/components/classes/global.ts';
  
  export default {
    props: {
      id: {
        type: Number,
        required: true,        
      },
      creatureList: {
        type: Array<WithStatusCreature>,
        required: true, 
      },
    },

    computed: {
      getCreatureList(): Array<WithStatusCreature> {
        return this.creatureList.filter(c => c.status!.placeId == this.id)
      },

      getCreatureCount(): (tap: boolean) => number {
        return (tap: boolean) => {
          return this.getCreatureList.filter(c => c.status.tap == tap)
                                     .length;
        };
      },

      getCreatureName(): string {
        let creatures = this.getCreatureList;
        return creatures.length > 0 ? creatures[0].name : "";
      },

      powerToughnessText(): string {
        let creatures = this.getCreatureList;
        var powerText = "-";
        var toughnessText = "-";
        if (creatures.length > 0) {
          powerText = creatures[0].getPower().toString();
          toughnessText = creatures[0].getToughness().toString();
        }
        return powerText + " / " + toughnessText
      },

      getCounterText(): string {
        let creatures = this.getCreatureList;
        if (creatures.length > 0) {
          let counters = creatures[0].status.counters;
          let counterShowTextSet = new Set(counters.map(x => x.showText));
          let showTextAndCountList: { [key: string]: number; } = {};
          counterShowTextSet.forEach(showText => {
            let count = counters.filter(x => x.showText == showText).length;
            showTextAndCountList[showText] = count;
          });
          return Object.entries(showTextAndCountList).map(([key, value]) => `${key}x${value.toString()}`)
                                                    .join('/');
        } else {
          return "";
        }
      },
    },

    methods: {
      increseCreature(): void {
        let creatures = this.getCreatureList;
        if (creatures.length > 0) {
          var pushCreature = creatures[0].clone();
          this.creatureList.push(pushCreature);
        }
      },
      decreseCreature(): void {
        var creatures = this.getCreatureList;
        if (creatures.length > 0) {
          var deleteCreature = creatures[creatures.length - 1];
          var deleteIndex = this.creatureList.indexOf(deleteCreature);
          this.creatureList.splice(deleteIndex, 1);
        }
      },
      allTap(): void {
        let creatures = this.getCreatureList;
        creatures.forEach(c => {
          c.status.tap = true;
        });
      },
      allUntap(): void {
        let creatures = this.getCreatureList;
        creatures.forEach(c => {
          c.status.tap = false;
        });
      },
      increaseTap(): void {
        let untapCreatures = this.getCreatureList
                                 .filter(c => !c.status.tap);
        untapCreatures[untapCreatures.length - 1].status.tap = true;
      },
      increaseUntap(): void {
        let tapCreatures = this.getCreatureList
                               .filter(c => c.status.tap);
        tapCreatures[0].status.tap = false;
      },

      dropHandler(event: DragEvent): void {
        try {
          this.appendCounterByDragEvent(event);
        } catch {
          //ドロップされたデータが異なる場合があるのでErrorは虫
        }
        try {
          this.exchangeIdByDragEvent(event);
        } catch {
          //ドロップされたデータが異なる場合があるのでErrorは虫
        }
      },

      dragStartHandler(event: DragEvent): void {
        Global.setNumberDataToDragEvent(event, this.id);
      },

      appendCounter(counter: Counter): void {
        let creatures = this.getCreatureList;
        creatures.forEach(c => {
          c.status.counters.push(counter.clone());          
        });
      },

      appendCounterByDragEvent(event: DragEvent): void {
        let counter = Global.getObjectDataFromDragEvent(event, Counter.parseJson);
        this.appendCounter(counter);
      },

      exchangeIdByDragEvent(event: DragEvent): void {
        let exchangeId = Global.getNumberDataFromDragEvent(event);
        let exchangeCreatures = this.creatureList.filter(x => x.status.placeId == exchangeId);
        let myId = this.id;
        let myCreatures = this.getCreatureList;
        this.setIdToCreatures(exchangeCreatures, myId);
        this.setIdToCreatures(myCreatures, exchangeId);
      },

      setIdToCreatures(creatures: WithStatusCreature[], setId: number): void {
        creatures.forEach(creature => {
          creature.status.placeId = setId
        });
      }
    },
  }
</script>