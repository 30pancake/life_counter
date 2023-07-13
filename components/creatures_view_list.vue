<template>
  <label @drop="dropHandler($event)" @dragover.prevent>クリーチャーを追加</label>
  <div v-for="placeId in getPlaceIdList">
    <CreaturesView :id=placeId :creatureList="creatureList" />
  </div>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';
  import CreatureStatus from '@/components/classes/creature_status.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';

  export default {
    props: {
        creatureList: {
            type: Array<WithStatusCreature>,
            required: true,
        },
    },
    computed: {
        getPlaceIdList(): Array<number> {
            let placeIds = this.creatureList.map(x => x.status.placeId);
            let placeIdSet = new Set(placeIds);
            return Array.from(placeIdSet).sort();
        },
    },
    methods: {
        dropHandler(event: DragEvent): void {
            let dataText = event.dataTransfer?.getData("dataText");
            if (dataText == undefined) {
                return;
            }
            let creature = this.makeCreature(dataText);
            let plateId = this.getRegisterPlaceId(this.creatureList, creature);
            let registerCreature = this.makeRegisterCreature(creature, plateId);
            this.creatureList.push(registerCreature);
        },
        makeCreature(dataText: string): Creature {
            let creatureData = JSON.parse(dataText);
            if (typeof creatureData === "object" && creatureData !== null) {
                const { name, power, toughness, ability } = creatureData;
                if (typeof name === "string" && typeof power === "number" &&
                    typeof toughness === "number" && typeof ability === "string") {
                    return Creature.create(name, power, toughness, ability);
                }
            }
            throw new Error("illegal creature data text.");
        },
        makeStatus(id: number): CreatureStatus {
            let status = new CreatureStatus();
            status.placeId = id;
            return status;
        },
        makeRegisterCreature(creature: Creature, placeId: number): WithStatusCreature {
            let status = this.makeStatus(placeId);
            return WithStatusCreature.create(creature, status);
        },
        getRegisterPlaceId(creatures: WithStatusCreature[], makeCreature: Creature): number {
          if (creatures.length == 0) {
            return 1;
          } else {
            let candidate = creatures.filter(x => x.status.counters.length == 0)
              .find(x => makeCreature.equals(x));
            if (candidate != undefined) {
                return candidate.status.placeId;
            }
            else {
                return Math.max(...creatures.map(x => x.status.placeId)) + 1;
            }
          }
        },
    },
}
</script>