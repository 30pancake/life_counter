export default class Counter implements Equals {
  //property
  name: string = "";
  powerBonus: number = 0;
  toughnessBonus: number = 0;

  //constructor
  constructor() { }

  //methods
  clone(): Counter {
    var clone = new Counter();
    clone.copy(this);
    return clone;
  }

  copy(source: Counter): void {
    this.name = source.name;
    this.powerBonus = source.powerBonus;
    this.toughnessBonus = source.toughnessBonus;
  }

  equals(obj: object): boolean {
    if (obj instanceof Counter) {
      return this.name == obj.name &&
      this.powerBonus == obj.powerBonus &&
      this.toughnessBonus == obj.toughnessBonus;
    } else {
      return false;
    }
  }

  //static method
  static create(name: string, powerBonus: number, toughnessBonus: number): Counter {
    let counter = new Counter();
    counter.name = name;
    counter.powerBonus = powerBonus;
    counter.toughnessBonus = toughnessBonus;
    return counter;
  }

  static parseJson(jsonText: string): Counter {
    let counterData = JSON.parse(jsonText);
    if (typeof counterData === 'object' && counterData !== null) {
      const {name, powerBonus, toughnessBonus} = counterData;
      const powerBonusValue = parseInt(powerBonus, 10);
      const toughnessBonusValue = parseInt(toughnessBonus, 10);
      if (!isNaN(powerBonusValue) && !isNaN(toughnessBonusValue)) {
        return Counter.create(name, parseInt(powerBonus, 10), parseInt(toughnessBonus, 10));
      }
    }
    throw new Error("jsonデータからのCounterデータのパース失敗");
  }

  static canConvert(obj: any) : boolean {
    return "name" in obj && "powerBonus" in obj && "toughnessBonus" in obj;
  }

  static convert(obj: any): Counter {
    if (this.canConvert(obj)) {
      return Counter.create(obj.name, obj.powerBonus, obj.toughnessBonus);
    } else {
      throw new Error();
    }
  }
}