import { Search } from "lucide-react";

interface SearchProps  {
  value: string;
  onChange: (value: string) => void
}

export default function SearchInput({value, onChange}: SearchProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-5 top-1/2 -translate-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search rooms"
        className="rounded-xl text-sm w-full border bg-white border-slate-200 outline-none py-2.5 pr-4 pl-10"
      />
    </div>
  );
}
