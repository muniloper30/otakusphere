const DatosUser = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-4">👤 Mis datos</h1>
        <div className=" shadow-lg rounded-lg p-6 space-y-4">
          <p><strong>Nombre:</strong> {usuario?.nombre}</p>
          <p><strong>Email:</strong> {usuario?.email}</p>
          <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
            Editar datos
          </button>
        </div>
      </div>
    );
  };
  
  export default DatosUser;
  