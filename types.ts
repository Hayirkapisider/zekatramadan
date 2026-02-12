export interface CountryData {
  id: number;
  tur: number;
  minKisi: number;
  maxKisi: number | null;
  paketFiyat: number;
  title: string;
  text: string;
  wa: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
