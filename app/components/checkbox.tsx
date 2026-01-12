type TCheckbox = {
  option: TFacetOption;
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ option, checked, onChange }: TCheckbox) => (
  <label
    htmlFor={option.identifier}
    className="mb-2 inline-flex items-center gap-3"
  >
    <input
      type="checkbox"
      className="size-5 rounded border-gray-300 shadow-sm"
      id={option.identifier}
      checked={checked}
      onChange={onChange}
      disabled={option.productCount === 0}
    />
    <span className="font-medium text-gray-700">
      {option.displayValue || (option.value as string)}
    </span>
  </label>
);

export default Checkbox;
