<template>
  <label>{{ id }}</label>
  <label>{{ creatureList }}</label>
  <button @click="decreseCreature()">-</button>
  <button @click="increseCreature()">+</button>
  <label>{{ getCreatureName }}</label>
  <label>{{ powerToughnessText }}</label>
  <label>{{ getCreatureCount(false) }}</label>
  <label>{{ getCreatureCount(true) }}</label>
  <button @click="allUntap()">All</button>
  <button @click="increaseUntap()">-</button>
  <button @click="increaseTap()">+</button>
  <button @click="allTap()">All</button>
</template>

<script lang="ts">
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
        var creatures = this.getCreatureList;
        return creatures.length > 0 ? creatures[0].name : "";
      },

      powerToughnessText(): string {
        var creatures = this.getCreatureList;
        var powerText = "-";
        var toughnessText = "-";
        if (creatures.length > 0) {
          powerText = creatures[0].getPower().toString();
          toughnessText = creatures[0].getToughness().toString();
        }
        return powerText + " / " + toughnessText
      },
    },

    methods: {
      increseCreature(): void {
        var creatures = this.getCreatureList;
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
        var creatures = this.getCreatureList;
        creatures.forEach(c => {
          c.status.tap = true;
        });
      },
      allUntap(): void {
        var creatures = this.getCreatureList;
        creatures.forEach(c => {
          c.status.tap = false;
        });
      },
      increaseTap(): void {
        var untapCreatures = this.getCreatureList
                                 .filter(c => !c.status.tap);
        untapCreatures[untapCreatures.length - 1].status.tap = true;
      },
      increaseUntap(): void {
        var tapCreatures = this.getCreatureList
                               .filter(c => c.status.tap);
        tapCreatures[0].status.tap = false;
      },
    },
  }
</script>