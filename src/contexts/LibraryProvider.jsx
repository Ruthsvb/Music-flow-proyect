import { useState, useEffect, useMemo, useCallback } from 'react'
import { LibraryContext } from './LibraryContext'
import { tracks } from '../data/tracks'

/**
 * Proveedor del contexto de biblioteca para toda la aplicación
 * 
 * Este componente implementa:
 * - Persistencia de favoritos en localStorage
 * - Funciones para añadir/quitar canciones de favoritos
 * - Conversión automática de IDs a objetos de canción completos
 * 
 * @param {object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export function LibraryProvider({ children }) {
  // Estado para almacenar los IDs de las canciones favoritas
  // Inicializamos desde localStorage si existe, o array vacío si no
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem('likedTracks')
    return saved ? JSON.parse(saved) : []
  })

  // Efecto para guardar en localStorage cuando cambia el estado
  useEffect(() => {
    localStorage.setItem('likedTracks', JSON.stringify(liked))
  }, [liked])

  /**
   * Función para alternar el estado de favorito de una canción
   * Si ya está en favoritos, la quita; si no está, la añade
   * 
   * @param {string|number} id - ID de la canción a alternar
   */
  const toggleLike = useCallback(id => {
    setLiked(prev => {
      // Si ya existe, lo quitamos
      if (prev.includes(id)) {
        return prev.filter(trackId => trackId !== id)
      }
      // Si no existe, lo añadimos
      return [...prev, id]
    })
  }, [])

  /**
   * Objetos completos de las canciones favoritas
   * Calculado automáticamente a partir de los IDs y el catálogo completo
   */
  const likedTracks = useMemo(() => {
    return tracks.filter(track => liked.includes(track.id))
  }, [liked])

  // Memorizamos el valor del contexto para evitar renderizados innecesarios
  const value = useMemo(
    () => ({
      liked,       // IDs de canciones favoritas
      toggleLike,  // Función para alternar favorito
      likedTracks, // Objetos completos de canciones favoritas
    }),
    [liked, toggleLike, likedTracks]
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}
