import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const OptionSelect = ({
  category,
  options,
  selected,
  onChange,
  formatCurrency,
}: {
  category: string;
  options: Option[];
  selected?: Option;
  onChange: (name: string) => void;
  formatCurrency: Intl.NumberFormat;
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={category} className="font-bold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </label>
      <Select value={selected?.name ?? ""} onValueChange={(e) => onChange(e)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecteer een optie" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.name} value={opt.name}>
              {opt.name}
              {opt.priceModifier > 0
                ? ` (+ ${formatCurrency.format(opt.priceModifier)})`
                : ""}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OptionSelect;
