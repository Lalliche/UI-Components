import classNames from "classnames";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between w-full  py-3 text-[0.9em] font-medium">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
        className={classNames(
          "px-[14px] py-2 rounded-lg border-2  border-[#D0D5DD] ",
          {
            "bg-white text-[#344054] cursor-not-allowed":
              currentPage === 1 || totalPages === 0,
            "bg-blue-500 text-white border-blue-600 hover:bg-blue-600":
              currentPage !== 1 && totalPages > 0,
          }
        )}
        style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}
      >
        Précédent
      </button>

      {totalPages == 0 ? (
        <p className="text-center text-[#344054] font-semibold ">Aucune page</p>
      ) : (
        <p className="text-center text-[#344054] font-semibold ">
          Page &nbsp;{currentPage}&nbsp; Sur&nbsp; {totalPages}
        </p>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={classNames(
          "px-[14px] py-2 rounded-lg border border-[#D0D5DD]",
          {
            "bg-white text-[#344054] cursor-not-allowed":
              currentPage === totalPages || totalPages === 0,
            "bg-blue-500 text-white  hover:bg-blue-600":
              currentPage !== totalPages && totalPages > 0,
          }
        )}
        style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
