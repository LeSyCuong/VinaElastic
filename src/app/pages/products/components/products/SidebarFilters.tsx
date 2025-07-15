"use client";

type PriceRange = {
  label: string;
  min?: number;
  max: number | null;
};

type Props = {
  categories: { label: string; value: string }[];
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  priceRanges: PriceRange[];
  selectedRange: PriceRange | null;
  setSelectedRange: (val: PriceRange | null) => void;
};

export default function SidebarFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRanges,
  selectedRange,
  setSelectedRange,
}: Props) {
  return (
    <div className="hidden lg:block w-1/5 pl-5 border-r ">
      <h2 className="text-black font-bold text-lg mb-4">Thể loại</h2>
      {categories.map((c: any) => (
        <label
          key={c.value}
          className="text-black cursor-pointer hover:scale-[1.02] active:scale-95 transition duration-500 flex items-center gap-2 mb-2"
        >
          <input
            type="radio"
            name="category"
            checked={selectedCategory === c.value}
            onChange={() => setSelectedCategory(c.value)}
            className="accent-black"
          />
          {c.label}
        </label>
      ))}

      <h2 className="text-black font-bold text-lg mt-6 mb-4">Khoảng giá</h2>
      {priceRanges.map((range, index) => (
        <label
          key={index}
          className="cursor-pointer text-black hover:scale-[1.02] active:scale-95 transition duration-500 flex items-center gap-2 mb-2"
        >
          <input
            type="radio"
            name="price"
            checked={
              (range.label === "Tất cả" && selectedRange === null) ||
              selectedRange?.label === range.label
            }
            onChange={() =>
              range.label === "Tất cả"
                ? setSelectedRange(null)
                : setSelectedRange(range)
            }
            className="accent-black"
          />
          {range.label}
        </label>
      ))}
    </div>
  );
}
