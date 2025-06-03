const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 7;
  const halfMaxPages = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPages);
  let endPage = Math.min(totalPages, currentPage + halfMaxPages);

  if (currentPage <= halfMaxPages) {
    endPage = Math.min(totalPages, maxPagesToShow);
  } else if (currentPage + halfMaxPages >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
      {/* Botón Anterior */}
      <button
        onClick={() => {
          handlePrevious();
          handlePageClick(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-105 cursor-pointer
          ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "font-bold"}
        `}
      >
        Anterior
      </button>

      {/* Página actual visible siempre */}
      <span className="text-sm text-gray-400 font-bold">
        Página {currentPage} de {totalPages}
      </span>

      {/* Botones de página solo visibles en pantallas medianas o superiores */}
      <div className="hidden md:flex gap-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`py-2 px-3 rounded-md font-semibold transition duration-300 ${
              page === currentPage
                ? "bg-[#1B9CF0] text-white"
                : "bg-white text-gray-700 hover:bg-[#F166B4] hover:text-white cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => {
          handleNext();
          handlePageClick(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-105 cursor-pointer
          ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "font-bold"}
        `}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
