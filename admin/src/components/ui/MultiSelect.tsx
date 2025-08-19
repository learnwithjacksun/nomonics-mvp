import { X } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (updated: string[]) => void;
  label?: string;
};

export default function MultiSelect({ 
  options,
  selected,
  onChange,
  label,
}: MultiSelectProps) {
  const handleSelect = (value: string) => {
    if (!selected.includes(value)) {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const availableOptions = options.filter(
    (opt) => !selected.includes(opt.value)
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-muted font-medium">{label}</label>
      )}

      {/* Selected Items */}
      <div className="w-full min-h-[2.7rem] p-2 rounded-lg border border-line flex flex-wrap gap-2 mt-1">
        {selected.length > 0 ? (
          selected.map((val) => {
            const label = options.find((x) => x.value === val)?.label || val;
            return (
              <div
                key={val}
                className="flex items-center gap-2 bg-foreground px-3 py-1 rounded-full text-sm"
              >
                {label}
                <button type="button" onClick={() => handleRemove(val)}>
                  <X size={16} className="text-red-700" />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted px-2 py-1">No items selected</p>
        )}
      </div>

      {/* Available Options */}
      <div className="flex flex-wrap gap-2 mt-2">
        {availableOptions.map((opt) => (
          <div
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className="center text-xs py-1 px-3 font-medium rounded-lg border border-line hover:bg-foreground transition cursor-pointer"
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
