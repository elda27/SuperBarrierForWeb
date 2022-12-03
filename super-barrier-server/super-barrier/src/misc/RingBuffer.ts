export class RingBuffer<T> {
  private queue: T[];
  private maxSize: number;
  private cursor: number;

  constructor(maxSize: number) {
    this.queue = [];
    this.maxSize = maxSize;
    this.cursor = 0;
  }

  push(value: T): void {
    if (this.queue.length < this.maxSize) {
      // Fill array until maxSize
      this.queue.push(value);
      return;
    }

    this.queue[this.cursor] = value;
    this.cursor += 1;

    // Reset cursor
    if (this.cursor >= this.queue.length) {
      this.cursor = 0;
    }
  }

  reduce<U>(callback: (x: T, y: U) => U, initial: U): U {
    let y = initial;
    this.queue.forEach((x) => {
      y = callback(x, y);
    });
    return y;
  }

  get length(): number {
    return this.queue.length;
  }
}
export default RingBuffer;
