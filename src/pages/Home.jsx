import TrackList from '../components/tracks/TrackList'
import { tracks } from '../data/tracks'
import { formatTime } from '../utils/formatTime'

/**
 * Función de normalización de texto para búsquedas
 * 
 * @param {string} s - Cadena de texto a normalizar
 * @returns {string} - Texto en minúsculas y sin acentos para comparación

**/
const norm = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

/**
 * Componente Home - Página principal de la aplicación
 * 
 * @param {string} query - Texto de búsqueda (recibido desde App.jsx)

 **/
export default function Home({ query = '' }) {
  // Normalizamos el query para hacer búsquedas insensibles a mayúsculas y acentos
  const q = norm(query)
  
  // Filtramos las canciones si hay un query, sino mostramos todas
  const filtered = q
    ? tracks.filter(
        (t) => norm(t.title).includes(q) || norm(t.artist).includes(q)
      )
    : tracks

  // Seleccionamos las primeras 4 canciones para la sección "Recent"
  // Si hay resultados filtrados, usamos esos, sino las canciones originales
  const recentList = (filtered.length ? filtered : tracks).slice(0, 4)

  return (
    <div className="min-h-full">
      <section className="px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Encabezado de sección con título dinámico según estado de búsqueda */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {q ? `Results (${filtered.length})` : 'Featured'}
            </h2>
            <button className="text-xs text-white/70 hover:text-white">See all</button>
          </div>

          {/* Contenido principal: grid de canciones o mensaje de no resultados */}
          {filtered.length ? (
            // Si hay resultados, mostramos el grid de canciones
            <TrackList tracks={filtered} />
          ) : q ? (
            // Si hay query pero no resultados, mostramos mensaje
            <p className="text-sm text-white/60">
              No results for "{query}". Try another title or artist.
            </p>
          ) : null}

          {/* Sección de canciones recientes con formato de lista */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Recent</h2>

            <div className="flex flex-col">
              {recentList.map((t) => (
                <div
                  key={`recent-${t.id}`}
                  className="group flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-white/5 transition"
                >
                  {/* Lado izquierdo: miniatura + información de la canción */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={t.cover}
                      alt={t.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{t.title}</div>
                      <div className="text-sm text-white/60 truncate">{t.artist}</div>
                    </div>
                  </div>

                  {/* Lado derecho: duración de la canción formateada */}
                  <span className="text-xs md:text-sm text-white/60 tabular-nums shrink-0">
                    {formatTime(t.duration)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Espacio inferior para evitar que el player fijo tape el contenido */}
          <div className="h-20" />
        </div>
      </section>
    </div>
  )
}
