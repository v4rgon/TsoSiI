import { TestFunction } from './function';
import { DFT } from './dft';
import Complex from 'complex.js';
import { FFT } from './fft';
import { Convolution } from './convolution';
import { Correlation } from './correlation';

const toMagnitude = (x: Complex) => x.abs();
const toPhase = (x: Complex) => x.arg();

const lab1F = (x: number): number => {
  const y = Math.cos(5 * x) + Math.sin(x);
  return y;
}

const lab2F1 = (x: number) => Math.cos(x);
const lab2F2 = (x: number) => Math.sin(x);


export const calculate = (n: number) => {
  const testFunction = new TestFunction(lab1F);
  const original = testFunction.getData(n);
  const dft = new DFT();
  const [dftResult, dftQuantity] = dft.process(original);
  const dftRestored = dft.restore(dftResult);
  const fft = new FFT();
  const [fftResult, fftQuantity] = fft.process(original.map(x => new Complex(x, 0)));
  const fftRestored = fft.restore(fftResult);
  return {
    original,
    dft: {
      re: dftResult.map(v => v.re),
      im: dftResult.map(v => v.im),
      magnitude: dftResult.map(toMagnitude),
      phase: dftResult.map(toPhase),
      restored: dftRestored.map(v => v.re),
      quantity: dftQuantity,
    },
    fft: {
      re: fftResult.map(v => v.re),
      im: fftResult.map(v => v.im),
      magnitude: fftResult.map(x => x.div(original.length, 0)).map(toMagnitude),
      phase: fftResult.map(x => x.div(original.length, 0)).map(toPhase),
      restored: fftRestored.map(v => v.div(original.length, 0).re),
      quantity: fftQuantity,
    },
  };
}

export const calculateL2 = (n: number) => {
  const testFunction1 = new TestFunction(lab2F1);
  const testFunction2 = new TestFunction(lab2F2);
  const originalF1 = testFunction1.getData(n).map(x => new Complex(x, 0));
  const originalF2 = testFunction2.getData(n).map(x => new Complex(x, 0));
  const conv = new Convolution();
  const [convolution, convQuantity] = conv.process(originalF1, originalF2);
  const [convolutionFFT, convQuantityFFT] = conv.processFourier(originalF1, originalF2);
  const corr = new Correlation();
  const [correlation, corrQuantity] = corr.process(originalF1, originalF2);
  const [correlationFFT, corrQuantityFFT] = corr.processFourier(originalF1, originalF2);
  return {
    original: {
      f1: originalF1.map(x => x.re),
      f2: originalF2.map(x => x.re),
    },
    convolution: {
      plain: convolution.map(x => x.re),
      plainQuantity: convQuantity,
      fft: convolutionFFT.map(x => x.re),
      fftQuantity: convQuantityFFT,
    },
    correlation: {
      plain: correlation.map(x => x.re),
      plainQuantity: corrQuantity,
      fft: correlationFFT.map(x => x.re),
      fftQuantity: corrQuantityFFT,
    }
  }
}
