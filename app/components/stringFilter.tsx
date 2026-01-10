import {
  TFacetOptionBoolean,
  TFacetOptionPrice,
  TFacetOptionString,
} from "../types";
import Checkbox from "./checkbox";

type TStringFilter = {
  visibleOptions: TFacetOptionString[];
  selectedValues: (
    | TFacetOptionString
    | TFacetOptionBoolean
    | TFacetOptionPrice
  )["value"][];
  onToggle: (option: TFacetOptionString) => void;
  isSameValue: (
    a: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)["value"],
    b: (TFacetOptionString | TFacetOptionBoolean | TFacetOptionPrice)["value"]
  ) => boolean;
  className: string;
};

const StringFilter = ({
  visibleOptions,
  selectedValues,
  onToggle,
  isSameValue,
  className,
}: TStringFilter) => (
  <div className={className + " " + "flex flex-col"}>
    {visibleOptions.map((option) => (
      <Checkbox
        key={option.identifier}
        option={option}
        checked={selectedValues.some((v) => isSameValue(v, option.value))}
        onChange={() => onToggle(option)}
      />
    ))}
  </div>
);

export default StringFilter;
