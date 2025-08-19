/**
 * Componente proveedor para la biblioteca de canciones favoritas
 **/
import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { tracks as ALL } from './data/tracks'
import { LibraryContext } from './contexts/LibraryContext'

/**
 * Provider del contexto de biblioteca
 * 
 * @param {object} props 
 * @param {React.ReactNode} props.children 
 * 
 * Este componente proporciona acceso al estado de canciones favoritas a toda la aplicación
 * y maneja la persistencia de datos en localStorage.
 */
export function LibraryProvider({ children }) {
  // Almacenamos solo los IDs de las canciones favoritas en localStorage para minimizar espacio
  const [liked, setLiked] = useLocalStorage('likedTrackIds', [])

  /**
   * Función para alternar el estado de favorito de una canción
   * Se usan Callback para evitar recrear la función en cada renderizado
   * 
   * @param {string|number} id - ID de la canción a alternar
   */
  const toggleLike = useCallback(id => {
    setLiked(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }, [setLiked])

  // Obtenemos los objetos completos de las canciones favoritas a partir de los IDs
  const likedTracks = useMemo(() => 
    ALL.filter(t => liked.includes(t.id)), 
    [liked]
  )

  // Memorizamos el valor del contexto para evitar renderizados innecesarios
  const value = useMemo(
    () => ({ liked, toggleLike, likedTracks }), 
    [liked, likedTracks, toggleLike]
  )
  
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}
