<template>
  <div class="h-screen flex">
    <div class="flex flex-col flex-grow">
      <div>
        <creaturesUnitListView :creatureList="creatureList" />
      </div>
      <div class="mt-auto my-2">
        <playerInfoView ref="own_life_counter" :cookie-key="cookieKey.LIFE"/>
      </div>
    </div>
    <div class="flex flex-col flex-none w-40">
      <div class="h-1/3">
        <label>クリーチャーリスト</label>
        <creaturesSourceView :cookie-key="cookieKey.CREATURE_SOURCE"/>
      </div>
      <div class="h-1/3">
        <label>カウンターリスト</label>
        <countersSourceView :cookie-key="cookieKey.COUNTER_SOURCE"/>
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
  import CookieKey from '@/components/classes/cookie_key.ts';

  interface LifeCounterInfo {
    initialLifeValue: number
    creatureList: WithStatusCreature[],
    cookieKey: CookieKey,
  }
  export default {
    data(): LifeCounterInfo {
      return {
        initialLifeValue: 20,
        creatureList: [],
        cookieKey: new CookieKey(),
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
  }
</script>