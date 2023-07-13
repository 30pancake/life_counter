<template>
  <button @click="initializeLife">ライフ初期化</button>
  <button @click="setCreature">クリーチャーセット</button>
  <life_counter ref="own_life_counter"/>
  <counterList />
  <creatureListView />
  <creaturesViewList :creatureList="creatureList" />
</template>

<script lang="ts">
  import Counter from '@/components/classes/counter.ts';
  import CreatureStatus from '@/components/classes/creature_status.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';

  interface LifeCounterInfo {
    initialLifeValue: number
    creatureList: WithStatusCreature[]
  }
  export default {
    data(): LifeCounterInfo {
      return {
        initialLifeValue: 20,
        creatureList: [],
      };
    },
    methods: {
      initializeLife() {
        this.$refs.own_life_counter.setLife(this.initialLifeValue)
      },
      setCreature() {
        let status = new CreatureStatus();
        status.placeId = 1;
        status.counters = [
          Counter.create("+1/+1", "+1", 1, 1),
          Counter.create("破壊不能", "破壊不能", 0, 0),
        ];
        let newCreature = new WithStatusCreature();
        newCreature.name = "狼";
        newCreature.power = 2;
        newCreature.toughness = 2;
        newCreature.status = status;
        this.creatureList.push(newCreature);
      },
    },
    mounted() {
      this.initializeLife();
    },
  }
</script>