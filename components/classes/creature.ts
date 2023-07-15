export default class Creature {
  //property
  name: string = "";
  power: number = 0;
  toughness: number = 0;
  ability: string = "";

  //constructor
  constructor() { }

  //methods
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

  equals(dst: Creature): boolean {
    return this.name == dst.name &&
      this.power == dst.power &&
      this.toughness == dst.toughness &&
      this.ability == dst.ability;
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
        if (typeof name === "string" && typeof power === "number" &&
            typeof toughness === "number" && typeof ability === "string") {
            return Creature.create(name, power, toughness, ability);
        }
    }
    throw new Error("jsonデータからのCreatureデータのパース失敗");
  }
}