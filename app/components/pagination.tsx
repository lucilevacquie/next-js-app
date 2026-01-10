import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useProductContext } from "../context/productContext";

const Pagination = () => {
  const { totalPageNumber, currentPageNumber, setCurrentPageNumber } =
    useProductContext();

  const nextPrevClass = "disabled:text-gray-400";
  return (
    <>
      {totalPageNumber && totalPageNumber > 0 && (
        <nav aria-label="Pagination">
          <ul className="flex gap-2 justify-center">
            <button
              onClick={() => setCurrentPageNumber((p) => Math.max(1, p - 1))}
              disabled={currentPageNumber === 1}
              className={nextPrevClass}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon width={32} height={32} />
            </button>

            {Array.from({ length: totalPageNumber }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPageNumber(page)}
                  aria-current={page === currentPageNumber ? "page" : undefined}
                  className={
                    "p-2 border-black border-2" +
                    " " +
                    (page === currentPageNumber &&
                      "bg-[#408548] text-white font-bold")
                  }
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPageNumber((p) => Math.min(totalPageNumber, p + 1))
              }
              disabled={currentPageNumber === totalPageNumber}
              className={nextPrevClass}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon width={32} height={32} />
            </button>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
