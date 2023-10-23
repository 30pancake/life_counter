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

  static compare(obj1: CreatureStatus, obj2: CreatureStatus, comparePlaceId: boolean, compareTap: boolean): boolean {
    if (obj1 == null || obj1 == undefined || obj2 == null || obj2 == undefined) {
      return false;
    } else {
      return (comparePlaceId ? obj1.placeId == obj2.placeId : true) &&
             (compareTap ? obj1.tap == obj2.tap : true) &&
             obj1.powerBonus == obj2.powerBonus &&
             obj1.toughnessBonus == obj2.toughnessBonus &&
             CreatureStatus._compareCounters(obj1.counters, obj2.counters);
    }
  }

  static _compareCounters(obj1: Counter[], obj2: Counter[]): boolean {
    if (obj1 == null || obj1 == undefined || obj2 == null || obj2 == undefined) {
      return false;
    } else if (obj1.length != obj2.length) {
      return false;
    } else if (obj1.length == 0 && obj2.length == 0) {
      return true;
    } else {
      var counterHashList = CreatureStatus._getCounterHashList(obj1);
      counterHashList.forEach(counter => {
        if (obj1.filter(c => Counter.compare(c, counter)).length != obj2.filter(c => Counter.compare(c, counter)).length) {
          return false;
        }
      });
      return true;
    }
  }

  static _getCounterHashList(counters: Counter[]): Counter[] {
    const counterHashList = new Array<Counter>();
    counters.forEach(c => {
      if (!counterHashList.some(x => Counter.compare(c, x))){
        counterHashList.push(c);
      }      
    });
    return counterHashList;
  }
}