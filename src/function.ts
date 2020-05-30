export class TestFunction {
  private f: (x: number) => number;
  constructor(f: (x: number) => number) {
    this.f = f;
  }

  getData(n: number): number[] {
    const data = new Array(n).fill(0);
    return data.map((_, i) => {
      const x = 2 * i * Math.PI / n;
      return this.f(x);
    });
  }

}