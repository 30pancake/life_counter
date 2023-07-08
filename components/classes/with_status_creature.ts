class WithStatusCreature extends Creature {
  //property
  status: CreatureStatus | null = null;

  //constructor
  constructor() {
    super();
  }

  //methods
  //修正値を加味したパワーを取得する
  getPower(): number {
    var ret = this.power;
    if (this.status != null) {
      ret += this.status!.power_bonus;
      this.status!.counters.forEach(counter => {
        ret += counter.power_bonus;
      });
    }
    return ret;
  }
  //修正値を加味したタフネスを取得する
  getToughness(): number {
    var ret = this.toughness;
    if (this.status != null) {
      ret += this.status!.toughness_bonus;
      this.status!.counters.forEach(counter => {
        ret += counter.toughness_bonus;
      });
    }
    return ret;
  }
}