import Counter from '@/components/classes/counter.ts';

export default class CreatureStatus {
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

  //static
  static create(placeId: number, tap: boolean, counters: Counter[], powerBonus: number, toughnessBonus: number): CreatureStatus {
    const status = new CreatureStatus();
    status.placeId = placeId;
    status.tap = tap;
    status.counters = counters;
    status.powerBonus = powerBonus;
    status.toughnessBonus = toughnessBonus;
    return status;
  }

  static canConvert(obj: any): boolean {
    return "placeId" in obj && "tap" in obj && "counters" in obj && "powerBonus" in obj && "toughnessBonus" in obj &&
           obj.counters instanceof Array &&
           obj.counters.every(x => Counter.canConvert(x));
  }

  static convert(obj: any): CreatureStatus {
    if (this.canConvert(obj) && obj.counters.every(x => Counter.canConvert(x))) {
      const counters = obj.counters.map(x => Counter.convert(x));
      return CreatureStatus.create(obj.placeId, obj.tap, counters, obj.powerBonus, obj.toughnessBonus);
    } else {
      throw new Error();
    }
  }
}