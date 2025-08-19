import TrackItem from './TrackItem'

/**
 * Componente TrackList - Contenedor de cuadrícula responsive para canciones
 * 
 * @param {Array} tracks - Array de objetos con la información de las canciones a mostrar
 * 
 
 */
export default function TrackList({ tracks }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Se itera sobre cada canción y renderizamos un TrackItem */}
      {tracks.map(track => (
        <TrackItem 
          key={track.id} // Clave única para optimizar el renderizado en React
          track={track} 
        />
      ))}
    </div>
  )
}
