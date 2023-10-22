<template>
  <div class="flex flex-row flex-wrap">
    <div class="m-2 border rounded" v-for="placeId in getPlaceIdList">
      <CreaturesUnitView class="w-36 h-48" :id=placeId :creatureList="creatureList" :allCounterList="allCounterList"/>
    </div>
  </div>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';
  import Global from '@/components/classes/global.ts';
  import Counter from '@/components/classes/counter.ts';

  export default {
    props: {
        creatureList: {
          type: Array<WithStatusCreature>,
          required: true,
        },
        allCounterList: {
          type: Array<Counter>,
          required: false,
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
            let plateId = Global.getRegisterPlaceId(this.creatureList, creature);
            let registerCreature = Global.makeRegisterCreature(creature, plateId, null);
            this.creatureList.push(registerCreature);
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