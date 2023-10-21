<template>
  <div class="h-screen flex">
    <!-- メインフィールド -->
    <div class="flex flex-col flex-grow">
      <!-- フィールド -->
      <div class="flex flex-col flex-grow">
        <div>
          <creaturesUnitListView :creatureList="creatureList" :allCounterList="getCounterListSource"/>
        </div>
      </div>
      <!-- 底 -->
      <div class="flex flex-row">
        <!-- 各ボタン -->
        <div class="flex flex-col">
          <button class="gray-button">クリーチャーをソート</button>
          <button class="gray-button" @click="untapAll">全クリーチャーをアンタップ</button>
          <button class="gray-button" @click="destloyAllCreatures">全クリーチャーを破壊</button>
          <button class="gray-button" @click="initializeLife">ライフを初期化</button>
        </div>
        <!-- ライフカウンター -->
        <div class="flex-grow mt-auto my-2">
          <playerInfoView ref="own_life_counter" :cookie-key="cookieKey.LIFE"/>
        </div>
        <!-- 全体修正 -->
        <div class="mt-auto">
          <ModifyView class="border rounded" :cookie-key="cookieKey.MODIFY_VALUE" @modifyValueEdited="applyOverallModification"/>
        </div>
      </div>
    </div>
    <!-- 右列 -->
    <div class="flex flex-col flex-none">
      <button class="gray-button" @click="hideSource = !hideSource">表示切り替え</button>
      <div class="flex-grow" v-if="!hideSource">
        <div class="h-1/2 overflow-auto border rounded">
          <label>クリーチャーリスト</label>
          <creaturesSourceView :cookie-key="cookieKey.CREATURE_SOURCE" @makeCreatureRequired="appendCreatureToCreaturesUnitList"/>
        </div>
        <div class="h-1/2 overflow-auto border rounded">
          <label>カウンターリスト</label>
          <countersSourceView ref="counter_source_list" :cookie-key="cookieKey.COUNTER_SOURCE"/>
        </div>
      </div>
      <div class="flex-grow" v-if="hideSource">
        <label>非表示中</label>
      </div>
      <div class="h-1/3 border rounded">
        <label>クリーチャー一覧</label>
        <creatureListView :creatureList="creatureList"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';
  import CookieKey from '@/components/classes/cookie_key.ts';
  import Global from '@/components/classes/global.ts';
  import Creature from '@/components/classes/creature.ts';
  import Counter from '@/components/classes/counter.ts';
  import ModifyValue from '@/components/classes/modify_value.ts';

  interface LifeCounterInfo {
    initialLifeValue: number
    creatureList: WithStatusCreature[],
    cookieKey: CookieKey,
    hideSource: boolean,
  }
  export default {
    data(): LifeCounterInfo {
      return {
        initialLifeValue: 20,
        creatureList: [],
        cookieKey: new CookieKey(),
        hideSource: false,
      };
    },
    watch: {
      creatureList: {
        handler(newVal) {
          try {
            Global.setToCookie(this.cookieKey.CREATURE_LIST, newVal);
          } catch {
            //
          }
        },
        deep: true,
      },
    },
    mounted() {
      try {
        const temp = Global.getFromCookie(this.cookieKey.CREATURE_LIST);
        if (temp instanceof Array) {
          this.creatureList = temp.filter(x => WithStatusCreature.canConvert(x))
                                  .map(x => WithStatusCreature.convert(x));
        }
      } catch {
        //
      }
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
      untapAll(): void {
        this.creatureList.forEach(c => {
          c.status.tap = false;
        });
      },
      appendCreatureToCreaturesUnitList(creature: Creature): void {
        const plateId = this.creatureList.length == 0 ? 1 : Math.max(...this.creatureList.map(x => x.status.placeId)) + 1
        let registerCreature = Global.makeRegisterCreature(creature, plateId);
        this.creatureList.push(registerCreature);
      },
      getCounterListSource(): Counter[] {
        return this.$refs.counter_source_list.getCounterList()
      },
      applyOverallModification(modifyValue: ModifyValue): void {
        this.creatureList.forEach(c => {
          c.status.powerBonus = modifyValue.power;
          c.status.toughnessBonus = modifyValue.toughness;
        });
      },
    },
  }
</script>