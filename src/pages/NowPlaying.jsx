import { useAudio } from '../hooks/useAudio'
import { useState, useEffect } from 'react'

// Página de reproducción actual
export default function NowPlaying() {
  const { current, isPlaying, togglePlay } = useAudio()
  const [animateIn, setAnimateIn] = useState(false)
  const [progress, setProgress] = useState(0)
  
  // Animación de entrada
  useEffect(() => {
    setAnimateIn(true)
  }, [])
  
  // Progreso
  useEffect(() => {
    if (!current || !isPlaying) return
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0
        return prev + 0.1
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [current, isPlaying])

  return (
    <section className="px-4 py-6 min-h-[calc(100vh-180px)] relative overflow-hidden">
      {/* Fondo */}
      {current && (
        <div className="absolute inset-0 -z-10">

          <div className="absolute inset-0 opacity-30">
            <div 
              className="absolute inset-0 bg-center bg-cover blur-3xl scale-110" 
              style={{ backgroundImage: `url(${current.cover})` }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className={`transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h2 className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">Now Playing</h2>
        </div>

        {!current ? (
          <div className={`bg-white/5 backdrop-blur-md rounded-xl p-8 text-center border border-white/10 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-600/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No hay canción reproduciéndose</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto">
              Selecciona un track desde Home o Library para empezar a escuchar música.
            </p>
          </div>
        ) : (
          <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-8">
              {/* Portada */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-blue-500 opacity-75 group-hover:opacity-100 blur rounded-xl transition-all duration-500" />
                <div className="relative">
                  <img
                    src={current.cover}
                    alt={current.title}
                    className={`h-64 w-64 md:h-80 md:w-80 rounded-xl object-cover shadow-2xl shadow-purple-900/30 ${isPlaying ? 'animate-subtle-pulse' : ''}`}
                  />

                  {isPlaying && (
                    <div className="absolute bottom-4 right-4 bg-accent rounded-full p-2 shadow-lg animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Info y controles */}
              <div className="flex-1 min-w-0 flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
                <div>
                  <p className="text-sm text-white/70 font-medium mb-1">CANCIÓN</p>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 mb-2">
                    {current.title}
                  </h1>
                  <p className="text-xl text-white/80 font-medium">{current.artist}</p>
                </div>
                

                <div className="w-full max-w-md">
                  <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full transition-all duration-300 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>0:{String(Math.floor(progress * 0.01 * current.duration)).padStart(2, '0')}</span>
                    <span>{Math.floor(current.duration / 60)}:{String(current.duration % 60).padStart(2, '0')}</span>
                  </div>
                </div>
                

                <div className="flex items-center gap-6">
                  <button className="text-white/70 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={togglePlay}
                    className="bg-white rounded-full p-4 hover:scale-105 active:scale-95 transition-all shadow-lg"
                    aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  
                  <button className="text-white/70 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                    </svg>
                  </button>
                </div>
                

                <div className="flex items-center gap-4 mt-2">
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Añadir a la cola">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Guardar en favoritos">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors" title="Compartir">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Lyrics */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Lyrics
              </h3>
              <p className="text-white/60 text-sm italic">Lyrics no disponibles para esta canción.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

