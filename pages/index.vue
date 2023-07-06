<template>
  <button @click="initializeLife">ライフ初期化</button>
  <button @click="setCreature">クリーチャーセット</button>
  <life_counter ref="own_life_counter"/>
  <counterList />
  <creatures_view ref="creature_view"/>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        initialLifeValue: 20
      };
    },
    methods: {
      initializeLife() {
        this.$refs.own_life_counter.setLife(this.initialLifeValue)
      },
      setCreature() {
        let newCreature: Creature = {
          name: "狼",
          power: 2,
          toughness: 2,
          ability: "",
          counters: [],
        }
        this.$refs.creature_view.setCreature(newCreature)
      },
    },
    mounted() {
      this.initializeLife()
    },
  }
</script>