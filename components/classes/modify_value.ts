//修正値を表すクラス
export default class ModifyValue {
  power: number = 0;
  toughness: number = 0;

  //method
  clone(): ModifyValue {
    return ModifyValue.create(this.power, this.toughness);
  }

  //static method
  static create(power: number, toughness: number): ModifyValue{
    let value = new ModifyValue();
    value.power = power;
    value.toughness = toughness;
    return value;
  }

  static canConvert(obj: any): boolean {
    return "power" in obj && "toughness" in obj;
  }
}