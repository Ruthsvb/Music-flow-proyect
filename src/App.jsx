import { useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Player from './components/layout/Player'
import Home from './pages/Home'
import Library from './pages/Library'
import NowPlaying from './pages/NowPlaying'

/**
 * Componente principal de la aplicación 
 **/
export default function App() {
  // Estado para controlar la navegación entre páginas
  const [route, setRoute] = useState('home')
  
  // Estado global para la funcionalidad de búsqueda
  // Este estado se pasa al Header y a la página Home
  const [query, setQuery] = useState('')

  /**
   * Renderiza condicionalmente la página activa según la ruta seleccionada
   * Este patrón permite una navegación simple sin necesidad de un router externo
   */
  const renderPage = () => {
    if (route === 'library') return <Library />
    if (route === 'playing') return <NowPlaying />
    return <Home query={query} /> // Pasamos query a Home para filtrar resultados
  }

  return (
    <div className="min-h-full grid grid-rows-[auto,1fr,auto] md:grid-rows-[auto,1fr,auto] md:grid-cols-[240px,1fr]">
      {/* Header abarca todo el ancho en desktop */}
      <div className="md:col-span-2">
        <Header 
          query={query} 
          onSearch={setQuery}
          active={route}
          onNavigate={setRoute}
          // Pasamos la ruta activa y la función para cambiar de página
        />
      </div>
      
      {/* Sidebar en la primera columna (solo visible en desktop) */}
      <Sidebar 
        active={route} 
        onNavigate={setRoute} 
        // Pasamos la ruta activa y la función para cambiar de página
      />
      
      {/* Contenido principal en la segunda columna */}
      <main className="min-h-[calc(100vh-56px)] md:border-l md:border-white/10">
        {renderPage()}
      </main>
      
      {/* Player abarca todo el ancho en la parte inferior */}
      <div className="md:col-span-2">
        <Player />
      </div>
    </div>
  )
}
