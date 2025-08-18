import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { AudioContext } from './AudioContext'
import { tracks } from '../data/tracks'

// Proveedor de audio centralizado
export function AudioProvider({ children }) {
  const audioRef = useRef(new Audio())
  const [current, setCurrent] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Sincronizar estado con eventos de audio
  useEffect(() => {
    const audio = audioRef.current
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  // Reproducir una canción
  const playTrack = useCallback(track => {
    if (!track) return
    const audio = audioRef.current
    
    if (current?.id !== track.id) {
      audio.src = track.src
      setCurrent(track)
    }
    
    audio.play()
  }, [current])

  // Alternar play/pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!current) return
    
    if (audio.paused) audio.play()
    else audio.pause()
  }, [current])

  // Avanzar a la siguiente canción
  const nextTrack = useCallback(() => {
    if (!current) return
    
    const currentIndex = tracks.findIndex(track => track.id === current.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    playTrack(tracks[nextIndex])
  }, [current, playTrack])

  // Retroceder a la canción anterior
  const prevTrack = useCallback(() => {
    if (!current) return
    
    const currentIndex = tracks.findIndex(track => track.id === current.id)
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    playTrack(tracks[prevIndex])
  }, [current, playTrack])

  // Valor del contexto
  const value = useMemo(
    () => ({
      current,
      isPlaying,
      playTrack,
      togglePlay,
      nextTrack,
      prevTrack
    }),
    [current, isPlaying, playTrack, togglePlay, nextTrack, prevTrack]
  )

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
