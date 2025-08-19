/**
 * Contexto para gestionar la biblioteca de canciones favoritas del usuario
 **/
import { createContext } from 'react'

// Creamos el contexto con valor inicial null
// Este contexto será consumido por el hook useLibrary
export const LibraryContext = createContext(null)
