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
        return Creature.create(name, parseInt(power, 10), parseInt(toughness, 10), ability);
      }
    throw new Error("jsonデータからのCreatureデータのパース失敗");
  }
}