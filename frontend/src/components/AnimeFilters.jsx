import React, { useEffect, useState } from "react";
import axios from "axios";

const AnimeFilters = ({ filters, onChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const query = `query { GenreCollection }`;

      try {
        const res = await axios.post(
          "https://graphql.anilist.co",
          { query },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setGenres(res.data.data.GenreCollection);
      } catch (error) {
        console.error("Error al cargar géneros:", error);
      }
    };

    fetchGenres();
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

  return (
    <div className=" rounded-xl shadow-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Buscar por título */}
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={onChange}
          placeholder="Buscar por título..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#1B9CF0] dark:text-white"
        />

        {/* Género */}
        <select
          name="genre"
          value={filters.genre}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#1B9CF0] dark:text-white"
        >
          <option value="">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Año */}
        <select
          name="year"
          value={filters.year}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#1B9CF0] dark:text-white"
        >
          <option value="">Todos los años</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Estado */}
        <select
          name="status"
          value={filters.status}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#1B9CF0] dark:text-white"
        >
          <option value="">Todos los estados</option>
          <option value="RELEASING">En emisión</option>
          <option value="FINISHED">Finalizado</option>
          <option value="NOT_YET_RELEASED">No estrenado</option>
          <option value="CANCELLED">Cancelado</option>
          <option value="HIATUS">En pausa</option>
        </select>
      </div>
    </div>
  );
};

export default AnimeFilters;
