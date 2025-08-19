import { useAudio } from '../../hooks/useAudio'
import { useLibrary } from '../../hooks/useLibrary'
import { useState } from 'react'

// Tarjeta de la canciones
export default function TrackItem({ track }) {
  const { playTrack, togglePlay, current, isPlaying } = useAudio()
  const { liked, toggleLike } = useLibrary()
  const [isHovering, setIsHovering] = useState(false)
  const isActive = current?.id === track.id
  const isLiked = liked.includes(track.id)

  // Función para manejar el clic en el botón de play/pause
  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (isActive) {
      // Si ya está activa, alternar entre play y pause
      togglePlay();
    } else {
      // Si no está activa, iniciar reproducción
      playTrack(track);
    }
  }

  return (
    <div 
      className="group relative bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-3 shadow-lg transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Efecto de fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Área principal */}
      <button
        onClick={handlePlayPause}
        className="relative block w-full text-left rounded-xl transition"
        aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${track.title} by ${track.artist}`}
      >
        {/* Portada */}
        <div className="relative overflow-hidden rounded-xl">

          <img
            src={track.cover}
            alt={track.title}
            className="w-full aspect-square rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 ${isHovering || (isActive && isPlaying) ? 'opacity-100' : ''} transition-opacity duration-300`}>

            <div 
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause(e);
              }} 
              className="bg-green-500/90 hover:bg-green-500 rounded-full p-3 shadow-lg shadow-green-500/30 backdrop-blur-sm cursor-pointer transform transition-transform duration-200 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 16 16">
                {isActive && isPlaying ? (
                  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                ) : (
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                )}
              </svg>
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="relative mt-3">
          <div className="font-medium truncate">
            {track.title}{' '}

            {isActive && (
              <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 align-middle">
                {isPlaying ? 'Playing' : 'Paused'}
              </span>
            )}
          </div>
          <div className="text-sm text-white/60 truncate">{track.artist}</div>
        </div>
      </button>

      {/* Acciones */}
      <div className="relative mt-3 flex items-center justify-between">

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(track.id);
          }}
          className={`
            text-xs px-3 py-1.5 rounded-full border transition-all duration-300
            ${isLiked 
              ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30' 
              : 'border-white/10 text-white/80 hover:bg-white/10'}
          `}
          aria-pressed={isLiked}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isLiked ? '♥ Guardado' : '♡ Guardar'}
        </button>


        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause(e);
          }}
          className="text-xs px-3 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
          aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${track.title}`}
        >
          {isActive && isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}
