export default class Creature implements Equals {
  //property
  name: string = "";
  power: number = 0;
  toughness: number = 0;
  ability: string = "";

  //constructor
  constructor() { }

  //methods
  getPowerToughnessText(): string {
    return this.power + " / " + this.toughness
  }

  clone(): Creature {
    var clone = new Creature();
    clone.copy(this);
    return clone;
  }

  copy(source: Creature): void {
    this.name = source.name;
    this.power = source.power;
    this.toughness = source.toughness;
    this.ability = source.ability;
  }

  equals(obj: object): boolean {
    if (obj instanceof Creature) {
      return this.name == obj.name &&
      this.power == obj.power &&
      this.toughness == obj.toughness &&
      this.ability == obj.ability;
    } else {
      return false;
    }
  }

  //static method
  static create(name: string, power: number, toughness: number, ability: string) {
    let creature = new Creature();
    creature.name = name;
    creature.power = power;
    creature.toughness = toughness;
    creature.ability = ability;
    return creature;
  }

  static parseJson(jsonText: string): Creature {
    let creatureData = JSON.parse(jsonText);
    if (typeof creatureData === "object" && creatureData !== null) {
        const { name, power, toughness, ability } = creatureData;
        const powerValue = parseInt(power, 10);
        const toughnessValue = parseInt(toughness, 10);
        if (!isNaN(powerValue) && !isNaN(toughnessValue)) {
          return Creature.create(name, parseInt(power, 10), parseInt(toughness, 10), ability);
        }
      }
    throw new Error("jsonデータからのCreatureデータのパース失敗");
  }

  static canConvert(obj: any): boolean {
    return "name" in obj && "power" in obj && "toughness" in obj && "ability" in obj;
  }

  static convert(obj: any): Creature {
    if (this.canConvert(obj)) {
      return Creature.create(obj.name, obj.power, obj.toughness, obj.ability);
    } else {
      throw new Error();
    }
  }

  static compare(obj1: Creature, obj2: Creature): boolean {
    if (obj1 == null || obj1 == undefined || obj2 == null || obj2 == undefined) {
      return false;
    } else {
      return obj1.name == obj2.name &&
             obj1.power == obj2.power &&
             obj1.toughness == obj2.toughness &&
             obj1.ability == obj2.ability;
    }
  }
}