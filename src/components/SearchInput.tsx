interface SearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

function SearchInput({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <>
      <label className=" w-full input flex gap-1 rounded-lg py-4 md:max-w-md mx-auto">
        <svg
          className="h-[2em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-slate-700 h-7 focus:border-slate-500 rounded-md border-2 border-slate-400 px-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </label>
    </>
  );
}
export default SearchInput;
