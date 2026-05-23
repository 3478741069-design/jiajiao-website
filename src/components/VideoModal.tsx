import { useEffect } from 'react'

interface VideoModalProps {
  teacherName: string
  videoUrl: string
  onClose: () => void
}

export default function VideoModal({ teacherName, videoUrl, onClose }: VideoModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 4, width: '100%', maxWidth: 680, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #eee' }}>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111' }}>{teacherName} · 自我介绍</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: '#f5f5f5', color: '#555', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
        <div style={{ background: '#000' }}>
          <video controls autoPlay style={{ width: '100%', display: 'block' }} src={videoUrl} />
        </div>
      </div>
    </div>
  )
}
