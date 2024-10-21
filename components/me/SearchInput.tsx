import { ChangeEvent, FC } from "react";
import { Input } from "../ui/input";
import { Loader, Loader2, SearchCode } from "lucide-react";

interface SearchProps {
  search: string;
  setSearch: (search: string) => void;
  isLoading: boolean;
}

const SearchInput: FC<SearchProps> = ({ isLoading, search, setSearch }) => {
  return (
    <div className="relative flex items-center max-sm:w-full">
    <Input
      value={search}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value.toLowerCase().trim())
      }
      name="search"
      id="search"
      placeholder="search..."
      className=""
    />
    {isLoading ? (
      <Loader
        size={20}
        className="text-primary absolute right-2 top-1/4 animate-spin"
      />
    ) : (
      <SearchCode
        size={18}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
      />
    )}
  </div>
  
  );
};

export default SearchInput;
