import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTeacher } from '../TeacherContext'
import { api } from '../lib/api'

interface NeedRow {
  id: number
  student_grade: string
  subjects: string[]
  frequency: string
  budget: string
  teacher_gender: string
  district: string
  address: string
  student_name: string
  parent_name: string
  phone: string
  notes: string
  created_at: string
}

interface TeacherRow {
  id: number
  name: string
  university: string
  year: string
  subjects: string[]
  grades: string[]
  district: string
  phone: string
  rating: number
  status: string
  created_at: string
}

export default function AdminNeeds() {
  const { teacher, loading: authLoading, logout } = useTeacher()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'needs' | 'teachers'>('needs')
  const [needs, setNeeds] = useState<NeedRow[]>([])
  const [teachers, setTeachers] = useState<TeacherRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    if (!authLoading && (!teacher || teacher.role !== 'admin')) {
      navigate('/teacher/login', { replace: true })
    }
  }, [teacher, authLoading])

  const fetchAll = () => {
    setLoading(true)
    Promise.all([api.adminGetNeeds(), api.adminGetTeachers()])
      .then(([n, t]) => {
        setNeeds(n)
        setTeachers(t)
        setError('')
        setLastUpdate(new Date().toLocaleTimeString())
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (teacher?.role === 'admin') {
      fetchAll()
      const timer = setInterval(fetchAll, 30000)
      return () => clearInterval(timer)
    }
  }, [teacher])

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.adminUpdateTeacherStatus(id, status)
      setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const formatTime = (t: string) => {
    const d = new Date(t)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return '刚刚'
    if (diffMin < 60) return `${diffMin}分钟前`
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}小时前`
    return d.toLocaleDateString('zh-CN') + ' ' + d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (authLoading || !teacher) return null

  const statusLabel: Record<string, { text: string; color: string }> = {
    active: { text: '已通过', color: '#10b981' },
    pending: { text: '待审核', color: '#f59e0b' },
    rejected: { text: '已拒绝', color: '#ef4444' },
  }

  return (
    <div style={{ background: '#f9f9f9', minHeight: 'calc(100vh - 56px)', padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111' }}>管理后台</h1>
            <p style={{ color: '#999', fontSize: '0.85rem', marginTop: 4 }}>
              需求 {needs.length} 条 · 老师 {teachers.length} 位 · 上次刷新 {lastUpdate}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn" onClick={fetchAll} disabled={loading}>
              {loading ? '刷新中...' : '手动刷新'}
            </button>
            <button className="btn" onClick={handleLogout} style={{ color: '#e53935' }}>退出</button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', borderRadius: 4, background: '#fef2f2', color: '#e53935', fontSize: '0.85rem', marginBottom: 20 }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button
            onClick={() => setTab('needs')}
            style={{
              padding: '8px 20px', borderRadius: 4, fontSize: '0.9rem', border: 'none',
              background: tab === 'needs' ? '#111' : '#f5f5f5',
              color: tab === 'needs' ? '#fff' : '#555', fontWeight: tab === 'needs' ? 600 : 400,
            }}
          >
            家长需求
          </button>
          <button
            onClick={() => setTab('teachers')}
            style={{
              padding: '8px 20px', borderRadius: 4, fontSize: '0.9rem', border: 'none',
              background: tab === 'teachers' ? '#111' : '#f5f5f5',
              color: tab === 'teachers' ? '#fff' : '#555', fontWeight: tab === 'teachers' ? 600 : 400,
            }}
          >
            老师审核
          </button>
        </div>

        {tab === 'needs' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {needs.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>暂无家长需求</p>
              </div>
            )}
            {needs.map((n) => (
              <div key={n.id} className="card" style={{
                padding: 20,
                borderLeft: new Date(n.created_at).toDateString() === new Date().toDateString() ? '3px solid #111' : undefined,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, color: '#111' }}>{n.parent_name}</span>
                      {n.student_name && <span style={{ color: '#999', fontSize: '0.82rem' }}>学生：{n.student_name}</span>}
                      <span style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.78rem', background: '#111', color: '#fff' }}>{n.student_grade}</span>
                      {(n.subjects || []).map((s) => (
                        <span key={s} style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid #ddd', color: '#555' }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ marginTop: 6, fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                      {n.district}{n.address ? ` · ${n.address}` : ''} · {n.frequency} · {n.budget}
                    </div>
                    {n.notes && <div style={{ marginTop: 4, fontSize: '0.83rem', color: '#999' }}>备注：{n.notes}</div>}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.78rem', color: '#999', marginBottom: 4 }}>{formatTime(n.created_at)}</div>
                    <div style={{ fontWeight: 600, color: '#e53935', fontSize: '0.95rem' }}>{n.phone}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'teachers' && (
          <div style={{ display: 'grid', gap: 12 }}>
            {teachers.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: 8 }}>暂无注册老师</p>
              </div>
            )}
            {teachers.map((t) => {
              const st = statusLabel[t.status] || statusLabel.pending
              return (
                <div key={t.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, color: '#111' }}>{t.name}</span>
                        <span style={{ color: '#999', fontSize: '0.82rem' }}>{t.university} · {t.year}</span>
                        <span style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.78rem', fontWeight: 600, background: st.color + '15', color: st.color }}>{st.text}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                        {(t.subjects || []).map((s) => (
                          <span key={s} style={{ padding: '1px 7px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid #ddd', color: '#555' }}>{s}</span>
                        ))}
                        <span style={{ padding: '1px 7px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid #ddd', color: '#999' }}>{t.district}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, fontSize: '0.8rem', color: '#999' }}>
                        <span>{t.phone}</span>
                        <span>评分 {Math.round(t.rating * 10) / 10}</span>
                        <span>{formatTime(t.created_at)}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      {t.status !== 'active' && (
                        <button
                          onClick={() => updateStatus(t.id, 'active')}
                          style={{ padding: '4px 14px', borderRadius: 4, fontSize: '0.8rem', border: 'none', background: '#10b981', color: '#fff', fontWeight: 500 }}
                        >通过</button>
                      )}
                      {t.status !== 'rejected' && (
                        <button
                          onClick={() => updateStatus(t.id, 'rejected')}
                          style={{ padding: '4px 14px', borderRadius: 4, fontSize: '0.8rem', border: 'none', background: '#ef4444', color: '#fff', fontWeight: 500 }}
                        >拒绝</button>
                      )}
                      {t.status === 'active' && (
                        <button
                          onClick={() => updateStatus(t.id, 'pending')}
                          style={{ padding: '4px 14px', borderRadius: 4, fontSize: '0.8rem', border: '1px solid #ddd', background: '#fff', color: '#555' }}
                        >撤销</button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 32, padding: 16, background: '#f5f5f5', borderRadius: 4, fontSize: '0.8rem', color: '#999', textAlign: 'center' }}>
          每 30 秒自动刷新 · 最新数据排在最前
        </div>
      </div>
    </div>
  )
}
