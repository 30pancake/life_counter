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

  //static method
  static create(name: string, showText: string, powerBonus: number, toughnessBonus: number): Counter {
    let counter = new Counter();
    counter.name = name;
    counter.showText = showText;
    counter.powerBonus = powerBonus;
    counter.toughnessBonus = toughnessBonus;
    return counter;
  }
}