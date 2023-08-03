<template>
  <div class="h-screen flex">
    <div class="flex flex-col flex-grow">
      <div>
        <creaturesUnitListView :creatureList="creatureList" />
      </div>
      <div class="mt-auto my-2">
        <playerInfoView ref="own_life_counter"/>
      </div>
    </div>
    <div class="flex flex-col flex-none w-40">
      <div class="h-1/3">
        <label>クリーチャーリスト</label>
        <creaturesSourceView/>
      </div>
      <div class="h-1/3">
        <label>カウンターリスト</label>
        <countersSourceView/>
      </div>
      <div class="h-1/3">
        <label>クリーチャー一覧</label>
        <creatureListView :creatureList="creatureList"/>
      </div>
    </div>
    <div class="fixed flex flex-col left-0 bottom-0">
      <button class="gray-button" @click="UntapAll">全クリーチャーをアンタップ</button>
      <button class="gray-button" @click="destloyAllCreatures">全クリーチャーを破壊</button>
      <button class="gray-button" @click="initializeLife">ライフを初期化</button>
    </div>
  </div>
</template>

<script lang="ts">
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';

  interface LifeCounterInfo {
    initialLifeValue: number
    creatureList: WithStatusCreature[],
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
      destloyAllCreatures(): void {
        if (confirm("全クリーチャーを破壊します。よろしいですか？")){
          this.creatureList.splice(0);
        }
      },
      UntapAll(): void {
        this.creatureList.forEach(c => {
          c.status.tap = false;
        });
      },
    },
    mounted() {
      this.initializeLife();
    },
  }
</script>