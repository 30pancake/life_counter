<template>
  <label @drop="dropHandler($event)" @dragover.prevent>クリーチャーを追加</label>
  <div v-for="placeId in getPlaceIdList">
    <CreaturesUnitView :id=placeId :creatureList="creatureList" />
  </div>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';
  import CreatureStatus from '@/components/classes/creature_status.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';
  import Global from '@/components/classes/global.ts';

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
            try {
              this.pushCreatureByDragEvent(event);
            } catch {
              //異なるタイプのデータがドロップされる場合があるので処理しない
            }
            try {
              this.assignNewIdToCreature(event);
            } catch {
              //異なるタイプのデータがドロップされる場合があるので処理しない
            }
        },
        pushCreatureByDragEvent(event: DragEvent): void {
            let creature = Global.getObjectDataFromDragEvent<Creature>(event, Creature.parseJson);
            let plateId = this.getRegisterPlaceId(this.creatureList, creature);
            let registerCreature = this.makeRegisterCreature(creature, plateId);
            this.creatureList.push(registerCreature);
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
        assignNewIdToCreature(event: DragEvent): void {
          let newId = Math.max(...this.creatureList.map(x => x.status.placeId)) + 1;
          let changeId = Global.getNumberDataFromDragEvent(event);
          let changeCreature = this.creatureList.find(x => x.status.placeId == changeId);
          changeCreature!.status.placeId = newId;
        }
    },
}
</script>