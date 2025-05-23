const DatosUser = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    return (
      <div>
        
        <div className="shadow-xl rounded-lg p-6 space-y-4 bg-white/10 backdrop-blur-lg border-1 border-white">
        <h1 className="text-2xl font-semibold mb-4">👤 Mis datos</h1>
          <p><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p><strong>Email:</strong> {usuario?.email}</p>
          <button className="mt-4 bg-[#F166B4] hover:bg-pink-500 text-white px-4 py-2 rounded cursor-pointer">
            Editar datos
          </button>
        </div>
      </div>
    );
  };
  
  export default DatosUser;
  