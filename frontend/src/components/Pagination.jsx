const Pagination = ({ currentPage, totalPages, onPageChange }) => {

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

      <button
        onClick={ () => {
            handleNext();
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