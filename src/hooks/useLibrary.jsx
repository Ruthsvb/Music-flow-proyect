/**
 * Hook personalizado para acceder al contexto de biblioteca

 **/
import { useContext } from 'react'
import { LibraryContext } from '../contexts/LibraryContext'

/**
 * Hook para acceder al contexto de biblioteca de canciones favoritas
 * 
 * @returns {object} 
 * @throws {Error} Si se utiliza fuera del LibraryProvider
 */
export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}
