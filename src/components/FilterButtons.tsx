interface PageProps {
  page: number;
  setPage: (value: number | ((prev: number) => number)) => void
}

function FilterButtons({ page, setPage }: PageProps) {
  const Page = 200;

  return (
    <>
      <section className="join grid grid-cols-3 mb-8">
        <button
          className="join-item btn btn-outline shadow-md"
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
          disabled={page === 1}
        >
          Previous page
        </button>
        <span className="col-span-1 text-lg font-bold text-center self-center">
          Page {page} of {Page}{" "}
        </span>
        <button
          className="join-item btn btn-outline shadow-md "
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next Page
        </button>
      </section>
    </>
  );
}

export default FilterButtons;
