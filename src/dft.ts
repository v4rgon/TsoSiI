import Complex from 'complex.js';

export class DFT {
  process(data: number[]): [Complex[], number] {
    const image: Complex[] = new Array(data.length).fill(new Complex(0, 0));
    let quantity = 0;
    for(let i = 0; i < data.length; i++) {
      for(let j = 0; j < data.length; j++) {
        const a: Complex = Complex.I.mul(-2, 0).mul(Math.PI, 0).div(data.length, 0).mul(j, 0).mul(i, 0).exp().mul(data[j], 0);
        image[i] = image[i].add(a);
        quantity++;
      }
      image[i] = image[i].div(data.length, 0);
    }

    return [image, quantity];
  }

  restore(image: Complex[]): Complex[] {
    const original: Complex[] = new Array(image.length).fill(new Complex(0, 0));
    for(let i = 0; i < image.length; i++) {
      for(let j = 0; j < image.length; j++) {
        const a: Complex = Complex.I.mul(2, 0).mul(Math.PI, 0).div(image.length, 0).mul(j, 0).mul(i, 0).exp().mul(image[j]);
        original[i] = original[i].add(a);
      }
    }

    return original;
  }
}