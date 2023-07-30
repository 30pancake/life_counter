export default class Counter implements Equals {
  //property
  name: string = "";
  showText: string = "";
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
    this.showText = source.showText;
    this.powerBonus = source.powerBonus;
    this.toughnessBonus = source.toughnessBonus;
  }

  equals(obj: object): boolean {
    if (obj instanceof Counter) {
      return this.name == obj.name &&
      this.showText == obj.showText &&
      this.powerBonus == obj.powerBonus &&
      this.toughnessBonus == obj.toughnessBonus;
    } else {
      return false;
    }
  }

  //static method
  static create(name: string, showText: string, powerBonus: number, toughnessBonus: number): Counter {
    let counter = new Counter();
    counter.name = name;
    counter.showText = showText;
    counter.powerBonus = powerBonus;
    counter.toughnessBonus = toughnessBonus;
    return counter;
  }

  static parseJson(jsonText: string): Counter {
    let counterData = JSON.parse(jsonText);
    if (typeof counterData === 'object' && counterData !== null) {
      const {name, showText, powerBonus, toughnessBonus} = counterData;
      return Counter.create(name, showText, parseInt(powerBonus, 10), parseInt(toughnessBonus, 10));
    }
    throw new Error("jsonデータからのCounterデータのパース失敗");
  }
}