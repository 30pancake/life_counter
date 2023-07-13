<template>



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

    methods: {
      dropHandler(event: DragEvent): void {
        let dataText = event.dataTransfer?.getData('dataText');
        if (dataText == undefined) {
          return;
        }
        let creature = this.makeCreature(dataText);
        let plateId = this.getRegisterPlateId(this.creatureList, creature);
        let registerCreature = this.makeRegisterCreature(creature, plateId);
        this.creatureList.push(registerCreature);
      },

      makeCreature(dataText: string): Creature {
        let creatureData = JSON.parse(dataText);
        if (typeof creatureData === 'object' && creatureData !== null) {
          const {name, powerBonus, toughnessBonus, ability} = creatureData;
          if (typeof name === 'string' && typeof powerBonus === 'number' && 
              typeof toughnessBonus === 'number' && typeof ability === 'string') {
            return Creature.create(name, powerBonus, toughnessBonus, ability);
          }
        }
        throw new Error("illegal creature data text.");
      },

      makeStatus(id: number): CreatureStatus {
        let status = new CreatureStatus();
        status.placeId = id;
        return status;
      },

      makeRegisterCreature(creature: Creature, plateId: number): WithStatusCreature {
        let status = this.makeStatus(plateId);
        return WithStatusCreature.create(creature, status);
      },

      getRegisterPlateId(creatures: WithStatusCreature[], makeCreature: Creature): number {
        let candidate = creatures.filter(x => x.status.counters.length == 0)
                                 .find(x => makeCreature.equals(x));
        if (candidate != undefined) {
          return candidate.status.placeId;
        } else {
          return Math.max(...creatures.map(x => x.status.placeId)) + 1;
        }
      },
    },
  }
</script>