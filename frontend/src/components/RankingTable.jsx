const RankingTable = ({ animes = [] }) => {
  const topAnimes = animes.slice(0, 10);

  return (
    <div  className="relative isolate px-6 lg:px-8 pt-30 pb-36">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">TOP 100 ANIME</h2>

      {/* Vista de escritorio */}
      <div id="ranking" className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600 text-sm text-white">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="py-2 pr-4">#</th>
              <th className="py-2">Anime</th>
              <th className="py-2">Género</th>
              <th className="py-2">Puntuación</th>
              <th className="py-2">Usuarios</th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Season</th>
              <th className="py-2">Estado</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {topAnimes.map((anime, index) => (
              <tr key={anime.id} className="hover:bg-gray-800">
                <td className="py-2 pr-4 font-semibold text-gray-400">
                  #{index + 1}
                </td>

                <td className="py-2 flex items-center gap-3">
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-12 h-16 object-cover rounded shadow-md"
                  />
                  <span className="font-medium">{anime.title}</span>
                </td>

                <td className="py-2 max-w-xs">
                  <div className="flex flex-wrap gap-1">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-2 text-green-300 font-bold">
                  {anime.score ?? "?"}%
                </td>

                <td className="py-2 text-sm text-gray-300">
                  {anime.userCount.toLocaleString()} users
                </td>

                <td className="py-2 text-sm">{anime.type}</td>

                <td className="py-2 text-sm">
                  {anime.season ?? "-"} {anime.year ?? ""}
                </td>

                <td className="py-2 text-sm">{anime.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
        {topAnimes.map((anime, index) => (
          <div
            key={anime.id}
            className="flex flex-col items-center text-center"
          >
            <span className="text-xs text-gray-400 font-semibold mb-1">
              #{index + 1}
            </span>
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-full aspect-[3/4] object-cover rounded shadow"
            />
            <span className="mt-1 text-sm text-white font-medium truncate w-full">
              {anime.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RankingTable;
