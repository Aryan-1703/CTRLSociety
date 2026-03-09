export default function Toasts({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <div key={t.id} className={`toast${t.type === 'error' ? ' toast-err' : ''}`}>
          {t.type === 'error' ? '⚠ ' : '✓ '}{t.msg}
        </div>
      ))}
    </div>
  )
}
