class CreatureStatus {
  //property
  placeId: number = 0;
  tap: boolean = false;
  counters: Counter[] = [];
  powerBonus: number = 0;
  toughnessBonus: number = 0;

  //constructor
  constructor() { }

  //methods
  clone(): CreatureStatus {
    var clone = new CreatureStatus();
    clone.copy(this);
    return clone;
  }

  copy(source: CreatureStatus): void {
    this.placeId = source.placeId;
    this.tap = source.tap;
    this.powerBonus = source.powerBonus;
    this.toughnessBonus = source.toughnessBonus;
    this.counters = source.counters.map(c => c.clone());
  }
}