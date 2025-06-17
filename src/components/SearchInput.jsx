import CreateTodo from "./CreateTodo";

function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <>
      <label className=" w-full input flex items-center gap-1 rounded-lg py-4 md:max-w-md mx-auto">
        <svg
          className="h-[1em] opacity-50"
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
          className="text-white focus:outline-none rounded-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </label>
      <div>
        <CreateTodo />
      </div>
    </>
  );
}
export default SearchInput;
