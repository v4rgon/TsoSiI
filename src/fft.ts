import Complex from 'complex.js';

export class FFT {
  quantity: number = 0;

  process (data: Complex[]): [Complex[], number] {
    this.quantity = 0;
    const res = this.internalProcess(data);
    return [res, this.quantity];
  }

  private internalProcess(data: Complex[]): Complex[] {
    if(data.length === 1) {
      return data;
    }
    const first = new Array(Math.floor(data.length / 2)).fill(new Complex(0, 0));
    const second = new Array(Math.floor(data.length / 2)).fill(new Complex(0, 0));
    let w = Complex.ONE;
    // @ts-ignore
    const wN = Complex.I.mul(-2).mul(Complex.PI).div(data.length).exp();
    for (let i = 0; i < data.length / 2; i++) {
      first[i] = data[i].add(data[i + Math.floor(data.length / 2)]);
      second[i] = data[i].sub(data[i + Math.floor(data.length / 2)]).mul(w);
      this.quantity++;
      w = w.mul(wN);
    }

    const firstImage = this.internalProcess(first);
    const secondImage = this.internalProcess(second);
    const image = new Array(data.length).fill(new Complex(0, 0));
    for(let i = 0; i < data.length / 2; i++) {
      image[2*i] = firstImage[i];
      image[2*i+1] = secondImage[i];
    }
    return image;
  }

  restore(image: Complex[]): Complex[] {
    if(image.length === 1) {
      return image;
    }
    const first = new Array(Math.floor(image.length / 2)).fill(new Complex(0, 0));
    const second = new Array(Math.floor(image.length / 2)).fill(new Complex(0, 0));
    let w = new Complex(1, 0);
    let wN = Complex.I.mul(2, 0).mul(Math.PI, 0).div(image.length, 0).exp();
    for(let i = 0; i < image.length / 2; i++) {
      first[i] = image[i].add(image[i + Math.floor(image.length / 2)]);
      second[i] = image[i].sub(image[i + Math.floor(image.length / 2)]).mul(w);
      w = w.mul(wN);
    }
    const firstRestored = this.restore(first);
    const secondRestored = this.restore(second);
    const restored = new Array(image.length).fill(new Complex(0, 0));
    for(let i = 0; i < image.length / 2; i++) {
      restored[2*i] = firstRestored[i];
      restored[2*i+1] = secondRestored[i];
    }

    return restored;
  }
}