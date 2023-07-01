<template>
  <button @click="initializeLife">ライフ初期化</button>
  <life_counter ref="own_life_counter"/>
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
    },
    mounted() {
      this.initializeLife()
    },
  }
</script>