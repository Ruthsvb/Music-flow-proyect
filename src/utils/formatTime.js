// Convierte segundos a mm:ss (ej. 208 -> "3:28")
export function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '--:--'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
