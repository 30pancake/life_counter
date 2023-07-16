export default class Counter {
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

  equals(target: Counter): boolean {
    return this.name == target.name &&
    this.showText == target.showText &&
    this.powerBonus == target.powerBonus &&
    this.toughnessBonus == target.toughnessBonus;
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
      if (typeof name === 'string' && typeof showText === 'string' && 
          typeof powerBonus === 'number' && typeof toughnessBonus === 'number' ) {
            return Counter.create(name, showText, powerBonus, toughnessBonus);
      }
    }
    throw new Error("jsonデータからのCounterデータのパース失敗");
  }
}