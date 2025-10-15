type Bike = {
  id: string;
  name: string;
  type: string;
  basePrice: number;
  description: string;
  images: string[];
  options: BikeOptions;
};

type Option = {
  name: string;
  priceModifier: number;
};

type BikeOptions = {
  frameSize: Option[];
  color: ColorOption[];
  wheelset: Option[];
  gearset: Option[];
};

type ColorOption = Option & {
  images: string[];
  selectorColors: string[];
};
