export type TattooOptions = {
  width: number;
  height: number;
  color: "black" | "color";
  region: "clean" | "coverup";
  detail: "simple" | "detailed";
  design: "ready" | "custom";
};

// Planning model, not a studio quotation. Public price references checked 2026-10-09:
// https://begotattoo.com/minimal-dovme/ (2,500 TL starting fee)
// https://www.bosphorusink.com/sss (2,000 TL starting fee)
// https://ersintattoo.com/dovme-fiyatlari (size-dependent price bands)
// Multipliers and area rate below are our estimates, not rates quoted by those studios.
export const tattooEstimateRates = {
  minimum: 2500,
  areaRate: 35,
  colorMultiplier: 1.5,
  coverupMultiplier: 1.35,
  detailMultiplier: 1.4,
  customFee: 1000,
};

export function estimateTattoo(options: TattooOptions) {
  if (![options.width, options.height].every(n => Number.isInteger(n) && n >= 1 && n <= 30)) {
    throw new RangeError("Ölçüler 1–30 cm arasında tam sayı olmalı.");
  }
  const rates = tattooEstimateRates;
  let amount = Math.max(rates.minimum, options.width * options.height * rates.areaRate);
  if (options.color === "color") amount *= rates.colorMultiplier;
  if (options.region === "coverup") amount *= rates.coverupMultiplier;
  if (options.detail === "detailed") amount *= rates.detailMultiplier;
  if (options.design === "custom") amount += rates.customFee;
  const round = (n: number) => Math.round(n / 100) * 100;
  return { low: round(amount * 0.8), high: round(amount * 1.25), area: options.width * options.height };
}
