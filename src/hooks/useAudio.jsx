import { useContext } from 'react'
import { AudioContext } from '../contexts/AudioContext'

// Hook para acceder al contexto de audio
export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>')
  return ctx
}
