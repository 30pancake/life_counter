export default class DataCount<T> {
  data: T;
  count: number = 0;

  //constructor
  constructor(data: T, count: number) {
    this.data = data;
    this.count = count;
  }
}