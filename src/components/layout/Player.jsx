import { useAudio } from '../../hooks/useAudio'
import { useState, useEffect } from 'react'

// Reproductor de audio 
export default function Player() {
  const { current, togglePlay, isPlaying, nextTrack, prevTrack } = useAudio()
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPulse, setIsPulse] = useState(false)

  // Simular reproducción
  useEffect(() => {
    let interval
    if (current && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            return 0
          }
          return prev + 1
        })
      }, 1000)
      
      const pulseInterval = setInterval(() => {
        setIsPulse(prev => !prev)
      }, 500)
      
      return () => {
        clearInterval(interval)
        clearInterval(pulseInterval)
      }
    } else {
      clearInterval(interval)
    }
  }, [current, isPlaying, duration])
  
  // Actualizar duración
  useEffect(() => {
    if (current) {
      setDuration(current.duration || 180) 
      setCurrentTime(0)
    }
  }, [current])
  
  // Formatear tiempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 backdrop-blur-lg supports-[backdrop-filter]:bg-black/40 z-50 transition-all duration-300 shadow-lg shadow-black/50">
      {/* Progreso */}
      {current && (
        <div className="h-1 w-full bg-white/10">
          <div 
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      )}
      
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Info canción */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {current ? (

            <>

              <div className="relative">
                <img 
                  src={current.cover} 
                  alt={current.title} 
                  className="h-12 w-12 rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-105" 
                />

                {isPlaying && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                    <div className="flex items-center gap-0.5">
                      <div className={`w-0.5 h-2 ${isPulse ? 'bg-white' : 'bg-white/70'} rounded-full transition-all duration-300`}></div>
                      <div className={`w-0.5 h-3 ${!isPulse ? 'bg-white' : 'bg-white/70'} rounded-full transition-all duration-300`}></div>
                      <div className={`w-0.5 h-1.5 ${isPulse ? 'bg-white' : 'bg-white/70'} rounded-full transition-all duration-300`}></div>
                    </div>
                  </div>
                )}
              </div>
              

              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{current.title}</div>
                <div className="text-xs text-white/60 truncate">{current.artist}</div>
              </div>
            </>
          ) : (

            <div className="text-sm text-white/60">Select a track to start playing</div>
          )}
        </div>

        {/* Controles */}
        <div className="flex items-center gap-2">

          <button
            onClick={prevTrack}
            className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
            disabled={!current}
            aria-label="Previous track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"/>
            </svg>
          </button>
          

          <button
            onClick={togglePlay}
            className="shrink-0 bg-white text-black hover:scale-105 rounded-full p-2 transition-all duration-300 disabled:opacity-40 shadow-lg"
            disabled={!current}
            aria-label={isPlaying ? 'Pause current track' : 'Play current track'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            )}
          </button>
          

          <button
            onClick={nextTrack}
            className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
            disabled={!current}
            aria-label="Next track"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"/>
            </svg>
          </button>
        </div>

        {/* Tiempo y volumen */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          {current && (
            <>

              <div className="text-xs text-white/60 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              

              <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-white/60" viewBox="0 0 16 16">
                  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                  <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
                </svg>
                <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white/60 w-3/4 rounded-full"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Barra de progreso */}
      {current && (
        <div className="px-4 pb-2 flex items-center gap-2 text-xs text-white/60">
          <span className="tabular-nums">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration} 
            value={currentTime} 
            onChange={handleProgressChange}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      )}
    </div>
  )
}
