import {
  TFacetOptionBoolean,
  TFacetOptionPrice,
  TFacetOptionString,
} from "../types";
import Checkbox from "./checkbox";

type PriceSliderProps = {
  visibleOptions: TFacetOptionPrice[];
  selectedValues: (
    | TFacetOptionString
    | TFacetOptionBoolean
    | TFacetOptionPrice
  )["value"][];
  onToggle: (option: TFacetOptionPrice) => void;
  isSameValue: (
    a: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)["value"],
    b: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)["value"]
  ) => boolean;
  className: string;
};

const PriceFilter = ({
  visibleOptions,
  selectedValues,
  onToggle,
  isSameValue,
  className,
}: PriceSliderProps) => (
  <div className={className + " " + "flex flex-col"}>
    {visibleOptions.map((option) => (
      <div key={option.identifier} className="flex gap-2">
        <Checkbox
          option={option}
          checked={selectedValues.some((v) => isSameValue(v, option.value))}
          onChange={() => onToggle(option)}
        />
        <span className="text-sm text-gray-500">{`(${option.productCount})`}</span>
      </div>
    ))}
  </div>
);

export default PriceFilter;
