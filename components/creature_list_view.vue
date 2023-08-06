<template>
  <div v-for="creatureCount in getCreatureCounts">
    <label>{{ creatureCount.data.name }}</label>
    <label>{{ "x" + creatureCount.count }}</label>
  </div>
</template>

<script lang="ts">
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';
  import Creature from '@/components/classes/creature.ts';
  import DataCount from '@/components/classes/data_count.ts';
  
  export default {
    props: {
        creatureList: {
            type: Array<WithStatusCreature>,
            required: true,
        },
    },
    computed: {
      getCreatureCounts(): Array<DataCount<Creature>> {
        const list: DataCount<Creature>[] = [];
        this.creatureList.forEach(element => {
          const creature: Creature = element;
          const target = list.find(x => creature.equals(x.data));
          if (target == undefined) {
            list.push(new DataCount(creature, 1));
          } else {
            target.count += 1;
          }
        });
        return list;
      },
    },
  }
</script>