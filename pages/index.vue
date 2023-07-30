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
      <div class="h-1/2">
        <label>クリーチャーリスト</label>
        <creaturesSourceView ref="creatures_source" @appendCreatureRequired="openNewCreatureModal" />
      </div>
      <div class="h-1/2">
        <label>カウンターリスト</label>
        <countersSourceView  ref="counters_source"  @appendCounterRequired="openNewCounterModal" />
      </div>
      <div class="fixed left-0 bottom-0">
        <button class="gray-button" @click="UntapAll">全クリーチャーをアンタップ</button>
        <button class="gray-button" @click="destloyAllCreatures">全クリーチャーを破壊</button>
        <button class="gray-button" @click="initializeLife">ライフを初期化</button>
      </div>
    </div>
  </div>
  <!-- モーダル -->
  <modalView :show="isNewCreatureModalOpen">
    <newCreatureView @end="closeNewCreatureModal" @creatureCreated="appendCreature"/>
  </modalView>
  <modalView :show="isNewCounterModalOpen">
    <newCounterView @end="closeNewCountereModal" @counterCreated="appendCounter"/>
  </modalView>
</template>

<script lang="ts">
  import Creature from '@/components/classes/creature.ts';
  import Counter from '@/components/classes/counter.ts';
  import CreatureStatus from '@/components/classes/creature_status.ts';
  import WithStatusCreature from '@/components/classes/with_status_creature.ts';

  interface LifeCounterInfo {
    initialLifeValue: number
    creatureList: WithStatusCreature[],
    isNewCreatureModalOpen: boolean,
    isNewCounterModalOpen: boolean,
  }
  export default {
    data(): LifeCounterInfo {
      return {
        initialLifeValue: 20,
        creatureList: [],
        isNewCreatureModalOpen: false,
        isNewCounterModalOpen: false,
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
      openNewCreatureModal(): void {
        this.isNewCreatureModalOpen = true;
      },
      closeNewCreatureModal(): void {
        this.isNewCreatureModalOpen = false;
      },
      appendCreature(creature: Creature): void {
        this.$refs.creatures_source.appendCreature(creature);
      },
      openNewCounterModal(): void {
        this.isNewCounterModalOpen = true;
      },
      closeNewCountereModal(): void {
        this.isNewCounterModalOpen = false;
      },
      appendCounter(creature: Creature): void {
        this.$refs.counters_source.appendCounter(creature);
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