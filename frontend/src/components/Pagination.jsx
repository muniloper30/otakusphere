const Pagination = ({ currentPage, totalPages, onPageChange }) => {

const maxPagesToShow = 7; // Número máximo de páginas a mostrar en la paginación
const halfMaxPages = Math.floor(maxPagesToShow / 2); // Mitad del número máximo de páginas a mostrar


let startPage = Math.max(1, currentPage - halfMaxPages); // Página inicial
let endPage = Math.min(totalPages, currentPage + halfMaxPages); // Página final

if (currentPage <= halfMaxPages) {
    endPage = Math.min(totalPages, maxPagesToShow); // Si estamos al principio, ajustamos la página final
} else if (currentPage + halfMaxPages >= totalPages) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1); // Si estamos al final, ajustamos la página inicial
}

const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };

// Función para manejar el evento de clic al pulsar en el botón "Anterior"
const handlePrevious = () => {
    if (currentPage > 1) {
        onPageChange(currentPage - 1);
    }
};
// Función para manejar el evento de clic al pulsar en el botón "Siguiente"
const handleNext = () => {
    if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
    }
};   


return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={ () => {
            handlePrevious();
            handlePageClick(currentPage - 1);
            window.scrollTo({ top: 0 });
            }
        }
        disabled={currentPage === 1}
        className={`bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-125 cursor-pointer
          ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-white font-bold hover:bg-gray-100"}
        `}
      >
        Anterior
      </button>
                
    {/* Muestra la página actual y el total de páginas */}
      <span className="text-sm text-gray-400 font-bold ">
        Página {currentPage} de {totalPages}
      </span>

{/* Botones de páginas */}
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



      <button
        onClick={ () => {
            handleNext();
            handlePageClick(currentPage + 1);
            window.scrollTo({ top: 0 });
        }
        }
        
        disabled={currentPage === totalPages}
        className={`bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-125 cursor-pointer
          ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-white font-bold hover:bg-gray-100"}
        `}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;