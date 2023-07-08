<template>
  <button @click="initializeLife">ライフ初期化</button>
  <button @click="setCreature">クリーチャーセット</button>
  <life_counter ref="own_life_counter"/>
  <counterList />
  <creatures_view
    :id="1" :creatureList="creatureList" />
</template>

<script lang="ts">
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