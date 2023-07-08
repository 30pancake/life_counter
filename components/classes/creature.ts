class Creature {
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
}