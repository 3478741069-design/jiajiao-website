import { useEffect } from 'react'
import type { Teacher } from '../data/teachers'

interface Props {
  teacher: Teacher
  onClose: () => void
}

export default function TeacherDetailModal({ teacher, onClose }: Props) {
  const d = teacher.detail

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
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 24px', overflow: 'auto' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 4, width: '100%', maxWidth: 680, boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid #eee' }}>
          <div>
            <span style={{ fontWeight: 600, fontSize: '1.15rem', color: '#111' }}>{teacher.name}</span>
            <span style={{ marginLeft: 10, color: '#999', fontSize: '0.85rem' }}>{teacher.university} · {teacher.year}</span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#f5f5f5', color: '#555', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '24px 28px', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
            {teacher.subjects.map((s) => (
              <span key={s} style={{ padding: '2px 9px', borderRadius: 2, fontSize: '0.78rem', background: '#111', color: '#fff' }}>{s}</span>
            ))}
            {teacher.grades.map((g) => (
              <span key={g} style={{ padding: '2px 9px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid #ddd', color: '#555' }}>{g}</span>
            ))}
            <span style={{ padding: '2px 9px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid #ddd', color: '#999' }}>{teacher.district}</span>
            <span style={{ marginLeft: 'auto', fontWeight: 600, fontSize: '1rem' }}>¥{teacher.price}<span style={{ fontWeight: 400, fontSize: '0.78rem', color: '#999' }}>/小时</span></span>
          </div>
          <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: 10 }}>{teacher.description}</p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {teacher.tags.map((tag) => (
              <span key={tag} style={{ padding: '1px 8px', borderRadius: 2, fontSize: '0.75rem', background: '#f5f5f5', color: '#999' }}>{tag}</span>
            ))}
          </div>
        </div>

        {d && (
          <>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111', marginBottom: 10 }}>教学风格</div>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.8 }}>{d.teachingStyle}</p>
            </div>

            {d.introVideos.length > 0 && (
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111', marginBottom: 12 }}>自我介绍视频</div>
                {d.introVideos.map((url, i) => (
                  <div key={i} style={{ background: '#000', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                    <video controls style={{ width: '100%', display: 'block' }} src={url} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ padding: '20px 28px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111', marginBottom: 10 }}>个人成就</div>
              <ul style={{ paddingLeft: 18, color: '#555', fontSize: '0.88rem', lineHeight: 2 }}>
                {d.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>

            <div style={{ padding: '20px 28px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111', marginBottom: 10 }}>可上课时间</div>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>{d.availableTime}</p>
            </div>

            <div style={{ padding: '20px 28px', borderBottom: '1px solid #eee' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111', marginBottom: 12 }}>教学案例</div>
              {d.studentCases.map((c, i) => (
                <div key={i} style={{ marginBottom: i < d.studentCases.length - 1 ? 12 : 0, padding: 12, background: '#f9f9f9', borderRadius: 4 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#111', marginBottom: 4 }}>{c.title}</div>
                  <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px 28px' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111', marginBottom: 10 }}>预约须知</div>
              <p style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.6 }}>{d.contactHint}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
