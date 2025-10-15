"use client";

import { useEffect, useMemo, useState } from "react";
import ColorSelector from "./ui/color-picker";
import OptionSelect from "./ui/option-select";

const DetailsPane = ({
  options,
  basePrice,
  onColorChange,
}: Readonly<{
  options?: Partial<BikeOptions>;
  basePrice: number;
  onColorChange: (color: string) => void;
}>) => {
  const [selected, setSelected] = useState<
    Partial<Record<keyof BikeOptions, Option>>
  >({});

  const formatCurrency = useMemo(
    () =>
      new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }),
    [],
  );

  const getTotalPrice = (
    selections: Partial<Record<keyof BikeOptions, Option>>,
    basePrice: number,
  ): number => {
    return Object.values(selections).reduce(
      (total, opt) => total + (opt?.priceModifier ?? 0),
      basePrice,
    );
  };

  useEffect(() => {
    if (!options) return;
    const defaults: Partial<Record<keyof BikeOptions, Option>> = {};
    for (const key in options) {
      const opts = options[key as keyof BikeOptions];
      if (opts && opts.length > 0) {
        defaults[key as keyof BikeOptions] = opts[0];
      }
    }
    setSelected(defaults);
  }, [options]);

  const handleChange = (category: keyof BikeOptions, optionName: string) => {
    const option = options?.[category]?.find((o) => o.name === optionName);
    if (option) {
      setSelected((prev) => ({
        ...prev,
        [category]: option,
      }));
      if (category === "color" && onColorChange) {
        onColorChange(option.name);
      }
    }
  };

  return (
    <div className="py-6 lg:max-w-96 my-0 mx-auto lg:mx-0">
      {Object.entries(options ?? {})
        .filter(([category, opts]) => category !== "color" && opts?.length)
        .map(([category, opts]) => (
          <OptionSelect
            key={category}
            category={category}
            options={opts as Option[]}
            selected={selected[category as keyof BikeOptions]}
            onChange={(name) =>
              handleChange(category as keyof BikeOptions, name)
            }
            formatCurrency={formatCurrency}
          />
        ))}

      {options?.color && options.color.length > 0 && (
        <ColorSelector
          colorOptions={options.color}
          selectedColor={selected.color as ColorOption}
          onSelect={(name) => handleChange("color", name)}
          formatCurrency={formatCurrency}
        />
      )}

      <div className="font-bold text-lg border-t-2 border-t-muted pt-4 mt-4">
        Totaalprijs: {formatCurrency.format(getTotalPrice(selected, basePrice))}
      </div>
    </div>
  );
};

export default DetailsPane;
