import { Button } from "./button";

const ColorSelector = ({
  colorOptions,
  selectedColor,
  onSelect,
  formatCurrency,
}: {
  colorOptions: ColorOption[];
  selectedColor?: ColorOption;
  onSelect: (color: string) => void;
  formatCurrency: Intl.NumberFormat;
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label htmlFor="color" className="font-bold">
        Kleur:
        <span className="font-thin text-sm"> {selectedColor?.name}</span>
      </label>
      <div className="flex gap-3">
        {colorOptions.map((colorOption) => {
          const isSelected = selectedColor?.name === colorOption.name;
          return (
            <div className="flex flex-col items-center" key={colorOption.name}>
              <Button
                variant={isSelected ? "default" : "outline"}
                size="icon"
                className={`rounded-full transition-transform ${
                  isSelected ? "border-4 border-primary" : ""
                }`}
                onClick={() => onSelect(colorOption.name)}
              >
                <div className="relative h-full w-full flex overflow-hidden rounded-full">
                  {colorOption.selectorColors?.map((color) => (
                    <span
                      key={color}
                      className="h-10 w-10 grow"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </Button>
              {colorOption.priceModifier > 0 && (
                <span className="text-xs font-thin">
                  (+ {formatCurrency.format(colorOption.priceModifier)})
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ColorSelector;
