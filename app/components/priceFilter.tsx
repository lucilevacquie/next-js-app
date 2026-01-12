import Checkbox from "./checkbox";

type PriceSliderProps = {
  visibleOptions: TFacetOption[];
  selectedValues: TFacetOption[];
  onToggle: (option: TFacetOption) => void;
  className: string;
};

const PriceFilter = ({
  visibleOptions,
  selectedValues,
  onToggle,
  className,
}: PriceSliderProps) => (
  <div className={className + " " + "flex flex-col"}>
    {visibleOptions.map((option) => (
      <div key={option.identifier} className="flex gap-2">
        <Checkbox
          option={option}
          checked={selectedValues.some(
            (v) => v.identifier === option.identifier
          )}
          onChange={() => onToggle(option)}
        />
        <span className="text-sm text-gray-500">{`(${option.productCount})`}</span>
      </div>
    ))}
  </div>
);

export default PriceFilter;
