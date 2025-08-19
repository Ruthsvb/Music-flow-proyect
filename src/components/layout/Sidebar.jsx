/**
 * Botones 
 */
export default function Sidebar({ active = 'home', onNavigate }) {
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'library', label: 'Library' },
    { key: 'playing', label: 'Playing' },
  ]

  return (
    <aside className="hidden md:flex md:flex-col gap-2 p-4 border-r border-white/10 min-w-60">
      {items.map(({ key, label }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            onClick={() => onNavigate?.(key)}
            // Estilos de activo vs. inactivo
            className={
              'text-sm text-left px-3 py-2 rounded-md hover:bg-white/10 transition ' +
              (isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white')
            }
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </button>
        )
      })}
    </aside>
  )
}

