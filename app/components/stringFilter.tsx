import Checkbox from "./checkbox";

type TStringFilter = {
  visibleOptions: TFacetOption[];
  selectedValues: TFacetOption[];
  onToggle: (option: TFacetOption) => void;
  className: string;
};

const StringFilter = ({
  visibleOptions,
  selectedValues,
  onToggle,
  className,
}: TStringFilter) => (
  <div className={className + " " + "flex flex-col"}>
    {visibleOptions.map((option) => (
      <Checkbox
        key={option.identifier}
        option={option}
        checked={selectedValues.some((v) => v.identifier === option.identifier)}
        onChange={() => onToggle(option)}
      />
    ))}
  </div>
);

export default StringFilter;
