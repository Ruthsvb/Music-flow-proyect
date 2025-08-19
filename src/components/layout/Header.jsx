import { useState, useEffect } from 'react'

/**
 * Componente Header - Barra superior de navegación 
 * 
 * @param {string} query - Texto actual del campo de búsqueda (controlado desde App.jsx)
 * @param {function} onSearch - Función para actualizar el estado de búsqueda en el componente padre
 * @param {string} active - Ruta activa actual (home, library, playing)
 * @param {function} onNavigate - Función para cambiar de página
 * 
 */
export default function Header({ query = '', onSearch, active = 'home', onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  
  // Detectar scroll para cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Cerrar menú de usuario al hacer clic fuera
  useEffect(() => {
    if (!showUserMenu) return
    
    const closeMenu = () => setShowUserMenu(false)
    document.addEventListener('click', closeMenu)
    return () => document.removeEventListener('click', closeMenu)
  }, [showUserMenu])
  
  // Cerrar búsqueda móvil al cambiar de ruta
  useEffect(() => {
    setShowMobileSearch(false)
  }, [active])
  
  return (
    <header 
      className={`sticky top-0 z-20 transition-all duration-300 ${scrolled ? 'h-16 bg-black/95' : 'h-20 bg-gradient-to-b from-black/80 to-black/40'} backdrop-blur-md`}
    >
      {/* Efecto de borde inferior con gradiente */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-3">
        {/* Logo con gradiente y animación */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/20 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Music<span className="text-accent">Flow</span>
          </h1>
        </div>

        {/* Navegación principal - Visible en pantallas medianas y grandes */}
        <nav className="hidden md:flex items-center gap-1">
          <button 
            onClick={() => onNavigate('home')} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${active === 'home' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            <span className="relative z-10">Home</span>
            {active === 'home' && (
              <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-600/10 rounded-md animate-pulse-slow"></span>
            )}
          </button>
          
          <button 
            onClick={() => onNavigate('discover')} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${active === 'discover' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            <span className="relative z-10">Discover</span>
            {active === 'discover' && (
              <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-600/10 rounded-md animate-pulse-slow"></span>
            )}
          </button>
          
          <button 
            onClick={() => onNavigate('library')} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${active === 'library' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            <span className="relative z-10">Library</span>
            {active === 'library' && (
              <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-600/10 rounded-md animate-pulse-slow"></span>
            )}
          </button>
          
          <button 
            onClick={() => onNavigate('playing')} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${active === 'playing' ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            <span className="relative z-10">Playing</span>
            {active === 'playing' && (
              <span className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-600/10 rounded-md animate-pulse-slow"></span>
            )}
          </button>
        </nav>

        {/* Sección derecha: Búsqueda y perfil */}
        <div className="flex items-center gap-3">
          {/* Campo de búsqueda mejorado - visible en escritorio o cuando se activa en móvil */}
          <div className={`relative ${showMobileSearch ? 'block' : 'hidden sm:block'} w-64 lg:w-80 group`}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 rounded-full pl-10 pr-10 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-accent/50 placeholder-white/50 transition-all"
              placeholder="Search tracks, artists..."
              aria-label="Search"
            />
            
            {/* Botón para limpiar la búsqueda */}
            {!!query && (
              <button
                onClick={() => onSearch('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-black/30 rounded-full w-5 h-5 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Botón de búsqueda en móviles */}
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className={`sm:hidden p-2 rounded-full transition-colors ${showMobileSearch ? 'bg-accent text-white' : 'bg-white/10 hover:bg-white/20'}`}
            aria-label={showMobileSearch ? 'Cerrar búsqueda' : 'Abrir búsqueda'}
          >
            {showMobileSearch ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
          
          {/* Overlay de búsqueda móvil */}
          {showMobileSearch && (
            <div className="fixed sm:hidden inset-0 bg-black/80 z-10" onClick={() => setShowMobileSearch(false)}></div>
          )}

          {/* Icono de notificaciones */}
          <button className="hidden md:block p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {/* Indicador de notificaciones */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>

          {/* Avatar de usuario con menú desplegable */}
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full p-0.5 pr-3 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xs font-bold">
                JD
              </div>
              <span className="hidden md:inline text-sm font-medium">John Doe</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Menú desplegable con animaciones */}
            <div className={`absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-white/10 rounded-md shadow-lg py-1 z-30 transition-all duration-300 origin-top-right ${showUserMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              {/* Efecto de gradiente en la parte superior del menú */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              
              <button 
                onClick={() => {
                  setShowUserMenu(false);
                  // Simular navegación a perfil
                  alert('Navegando al perfil de usuario');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-accent transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-white/50 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              
              <button 
                onClick={() => {
                  setShowUserMenu(false);
                  // Simular navegación a configuración
                  alert('Abriendo configuración');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-accent transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-white/50 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </button>
              
              <div className="my-1 border-t border-white/10"></div>
              
              <button 
                onClick={() => {
                  setShowUserMenu(false);
                  // Simular cierre de sesión
                  alert('Cerrando sesión');
                }}
                className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-red-900/30 hover:text-red-400 transition-colors group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-white/50 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
              
              {/* Efecto de gradiente en la parte inferior del menú */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
