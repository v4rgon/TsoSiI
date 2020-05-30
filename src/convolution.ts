import Complex from "complex.js";
import { FFT } from "./fft";

export class Convolution {
  private fft: FFT;
  constructor() {
    this.fft = new FFT();
  }

  process(first: Complex[], second: Complex[]): [Complex[], number] {
    const res: Complex[] = new Array(first.length).fill(new Complex(0,0));
    let quantity = 0;
    for(let i = 0; i < first.length; i++) {
      for (let j = 0; j < first.length; j++) {
        if(i - j >= 0) {
          res[i] = res[i].add(first[j].mul(second[i-j]));
        } else {
          res[i] = res[i].add(first[j].mul(second[i-j+first.length]));
        }
        quantity++;
      }
      res[i] = res[i].div(new Complex(first.length, 0));
    }
    return [res, quantity];
  }

  processFourier(first: Complex[], second: Complex[]): [Complex[], number] {
    const [firstImage, quantity1] = this.fft.process(first);
    const [secondImage, quantity2] = this.fft.process(second);
    return [this.fft.restore(firstImage.map((fi, i) => fi.mul(secondImage[i]))), 2*quantity1 + 2*quantity2 + firstImage.length];
  }
}
