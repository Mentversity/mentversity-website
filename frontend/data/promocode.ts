// data/promocode.ts

export interface PromoCodeType {
  code: string;
  discountType: "flat" | "percent";
  discountValue: number; // For "flat": rupees; for "percent": percent
  description: string;
}

export const ALL_PROMOCODES: PromoCodeType[] = [
  {
    code: "NADEEM1000",
    discountType: "flat",
    discountValue: 1000,
    description: "Flat ₹1,000 off on any course",
  },
  {
    code: "SHAH1000",
    discountType: "flat",
    discountValue: 1000,
    description: "Flat ₹1,000 off on any course",
  },
  {
    code: "TAZEEN1000",
    discountType: "flat",
    discountValue: 1000,
    description: "Flat ₹1,000 off on any course",
  },
];

// Returns discounted price and description, or null if not valid
export function getDiscountedPrice(
  code: string,
  originalPrice: number
): { finalPrice: number; usedCode: PromoCodeType } | null {
  const promo = ALL_PROMOCODES.find(
    (p) => p.code.toLowerCase() === code.trim().toLowerCase()
  );
  if (!promo) return null;

  let finalPrice = originalPrice;
  if (promo.discountType === "percent") {
    finalPrice = Math.round(originalPrice * (1 - promo.discountValue / 100));
  } else if (promo.discountType === "flat") {
    finalPrice = Math.max(0, originalPrice - promo.discountValue);
  }
  return { finalPrice, usedCode: promo };
}
