// Muestra los tracks guardados (Library)
import { useLibrary } from '../hooks/useLibrary'
import TrackItem from '../components/tracks/TrackItem'
import { useState, useEffect } from 'react'

/** Página Library: lista los favoritos guardados en localStorage con estilo Spotify */
export default function Library() {
  const { likedTracks } = useLibrary()
  const [animateIn, setAnimateIn] = useState(false)
  
  // Efecto para animar la entrada de elementos
  useEffect(() => {
    setAnimateIn(true)
  }, [])

  return (
    <section className="px-4 py-6 min-h-[calc(100vh-180px)]">
      {/* Gradiente de fondo */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-purple-900/40 to-transparent -z-10" />
      
      <div className="max-w-6xl mx-auto">
        {/* Encabezado con animación */}
        <div className={`transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Playlist</p>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Your Library</h2>
            </div>
          </div>
        </div>

        {/* Contenido con animación */}
        <div className={`transition-all duration-1000 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {likedTracks.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 text-center border border-white/10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-600/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No hay canciones guardadas</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto">
                Toca el botón "♡" en cualquier canción desde Home para añadirla a tu biblioteca personal.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-white/70">{likedTracks.length} {likedTracks.length === 1 ? 'canción' : 'canciones'}</p>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Ordenar">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Vista">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {likedTracks.map((track, index) => (
                  <div 
                    key={track.id} 
                    className="transition-all duration-500" 
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      opacity: animateIn ? 1 : 0,
                      transform: animateIn ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <TrackItem track={track} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
