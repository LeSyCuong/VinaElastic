import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (val: string) => void;
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2 mb-4"
    >
      <div className="relative flex-1 max-w-md min-w-[200px]">
        <input
          type="text"
          className="text-black w-full border border-gray-300 rounded-xl py-2 pl-4 pr-4 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black hover:ring-[0.5px] transition-all duration-200"
          placeholder="Nhập sản phẩm cần tìm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm text-black rounded-xl shadow-sm hover:brightness-110 hover:scale-[1.02] active:scale-95 transition flex items-center gap-1"
      >
        <FaSearch className="text-sm" />
        Tìm
      </button>
    </form>
  );
}
