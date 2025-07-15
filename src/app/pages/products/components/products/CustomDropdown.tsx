import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import clsx from "clsx";

type Option = { label: string; value: string | number | null };

type Props = {
  label: string;
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
};

export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="w-full relative">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 bg-white shadow-sm transition focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <span className="text-sm text-gray-800">
          {selected?.label || "Chọn..."}
        </span>
        <IoChevronDown className="text-gray-400" />
      </button>

      {/* Dropdown menu */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 z-20 overflow-hidden transition-all duration-200 origin-top transform",
          {
            "scale-y-100 opacity-100": open,
            "scale-y-95 opacity-0 pointer-events-none": !open,
          }
        )}
        style={{ transformOrigin: "top" }}
      >
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => {
              onChange(opt.value);
              setOpen(false);
            }}
            className={clsx(
              "w-full text-left px-4 py-2 text-sm hover:bg-blue-100 transition",
              opt.value === value && "bg-blue-50 font-semibold text-blue-600"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
