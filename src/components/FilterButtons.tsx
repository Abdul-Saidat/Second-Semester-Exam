interface PageProps {
  page: number;
  setPage: (value: number | ((prev: number) => number)) => void
}

function FilterButtons({ page, setPage }: PageProps) {
  const Page = 200;

  return (
    <>
       <div className="flex justify-evenly">
        <button
          className="px-2 py-2 text-[15px] md:text-base md:px-5 md:py-3 cursor-pointer rounded-sm bg-slate-300 text-slate-700 hover:bg-slate-400 shadow-md"
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>

        <span className="col-span-1 text-[16px] md:text-lg font-bold text-center self-center">
          Page {page} of {Page}
        </span>

        <button
          className="px-2 py-2 text-[15px] md:px-5 md:py-3 cursor-pointer rounded-sm bg-slate-300 text-slate-700 hover:bg-slate-400 shadow-md"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next Page
        </button>
      </div>
    </>
  );
}

export default FilterButtons;
