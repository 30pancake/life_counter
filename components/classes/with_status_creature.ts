import Creature from '@/components/classes/creature.ts';
import CreatureStatus from '@/components/classes/creature_status.ts';

export default class WithStatusCreature extends Creature {
  //property
  status: CreatureStatus = new CreatureStatus();

  //constructor
  constructor() {
    super();
  }

  //methods
  //修正値を加味したパワーを取得する
  getPower(): number {
    var ret = this.power;
    ret += this.status.powerBonus;
    this.status.counters.forEach(counter => {
      ret += counter.powerBonus;
    });
   return ret;
  }
  //修正値を加味したタフネスを取得する
  getToughness(): number {
    var ret = this.toughness;
    ret += this.status.toughnessBonus;
    this.status!.counters.forEach(counter => {
      ret += counter.toughnessBonus;
    });
    return ret;
  }

  clone(): WithStatusCreature{
    var clone = new WithStatusCreature();
    clone.copy(this);
    return clone;
  }

  copy(source: WithStatusCreature): void {
    super.copy(source);
    this.status.copy(source.status);
  }
  //static method
  static create(creature: Creature, status: CreatureStatus): WithStatusCreature {
    let withStatusCreature = new WithStatusCreature();
    (withStatusCreature as Creature).copy(creature);
    withStatusCreature.status = status.clone();
    return withStatusCreature;
  }
}