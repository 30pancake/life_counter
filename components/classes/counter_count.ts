import Counter from '@/components/classes/counter.ts';

export default class CounterCount {
  counter: Counter;
  count: number = 0;

  //constructor
  constructor(counter: Counter, count: number) {
    this.counter = counter;
    this.count = count;
  }
}