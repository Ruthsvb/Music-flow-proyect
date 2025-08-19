import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Importamos estilos globales (incluye configuración de Tailwind)
import { AudioProvider } from './contexts/AudioProvider.jsx'
import { LibraryProvider } from './contexts/LibraryProvider.jsx'

/**
 * Punto de entrada principal de la aplicación

**/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider para la funcionalidad de reproducción de audio */}
    <AudioProvider>
      {/* Provider para gestionar la biblioteca de canciones favoritas */}
      <LibraryProvider>
        {/* Componente principal de la aplicación */}
        <App />
      </LibraryProvider>
    </AudioProvider>
  </React.StrictMode>
)