import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTeacher } from '../TeacherContext'
import { api } from '../lib/api'

interface NeedItem {
  id: number
  student_grade: string
  subjects: string[]
  frequency: string
  budget: string
  district: string
  address: string
  student_name: string
  notes: string
  match_level: number
  created_at: string
}

const matchLabels: Record<number, { text: string; color: string; bg: string }> = {
  3: { text: '高度匹配', color: '#10b981', bg: '#d1fae5' },
  2: { text: '中度匹配', color: '#f59e0b', bg: '#fef3c7' },
  1: { text: '低度匹配', color: '#3b82f6', bg: '#dbeafe' },
}

export default function TeacherDashboard() {
  const { teacher, loading: authLoading, logout } = useTeacher()
  const navigate = useNavigate()
  const [needs, setNeeds] = useState<NeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !teacher) {
      navigate('/teacher/login', { replace: true })
    }
  }, [teacher, authLoading])

  useEffect(() => {
    if (!teacher || teacher.role === 'admin') return
    api.getTeacherNeeds()
      .then((data) => { setNeeds(data); setLoading(false) })
      .catch((err: any) => { setError(err.message); setLoading(false) })
  }, [teacher])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatTime = (t: string) => {
    const d = new Date(t)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return '刚刚'
    if (diffMin < 60) return `${diffMin}分钟前`
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}小时前`
    return `${Math.floor(diffMin / 1440)}天前`
  }

  if (authLoading || !teacher) return null

  return (
    <div style={{ background: '#f9f9f9', minHeight: 'calc(100vh - 56px)', padding: '40px 0 80px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111' }}>工作台</h1>
            <p style={{ color: '#999', fontSize: '0.85rem', marginTop: 4 }}>
              欢迎，{teacher.name} · 系统根据您的学科、年级、区域自动匹配需求
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to="/teacher/profile" className="btn" style={{ fontSize: '0.85rem' }}>我的资料</Link>
            <button className="btn" onClick={handleLogout} style={{ fontSize: '0.85rem' }}>退出</button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '12px 16px', borderRadius: 4, background: '#fef2f2', color: '#e53935', fontSize: '0.85rem', marginBottom: 20 }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>
            <p>加载中...</p>
          </div>
        )}

        {!loading && needs.length === 0 && (
          <div className="card" style={{ padding: 60, textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.2rem', color: '#999' }}>📋</div>
            <p style={{ color: '#999', marginBottom: 8 }}>暂无匹配的需求</p>
            <p style={{ color: '#bbb', fontSize: '0.85rem' }}>有家长提交与您匹配的需求后，会自动出现在这里</p>
          </div>
        )}

        {needs.length > 0 && (
          <div style={{ display: 'grid', gap: 12 }}>
            {needs.map((n) => {
              const m = matchLabels[n.match_level] || matchLabels[1]
              return (
                <div key={n.id} className="card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                        <span style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.75rem', fontWeight: 600, background: m.bg, color: m.color }}>
                          {m.text}
                        </span>
                        <span style={{ fontWeight: 600, color: '#111' }}>{n.student_grade}</span>
                        {(n.subjects || []).map((s) => (
                          <span key={s} style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.78rem', background: '#111', color: '#fff' }}>{s}</span>
                        ))}
                        <span style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid #ddd', color: '#555' }}>{n.district}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>
                        {n.address && <span>{n.address} · </span>}
                        {n.frequency} · {n.budget}
                      </div>
                      {n.notes && (
                        <div style={{ marginTop: 6, padding: '8px 12px', background: '#f9f9f9', borderRadius: 4, fontSize: '0.83rem', color: '#888', lineHeight: 1.5 }}>
                          家长备注：{n.notes}
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 20 }}>
                      <div style={{ fontSize: '0.78rem', color: '#999' }}>{formatTime(n.created_at)}</div>
                      <div style={{ marginTop: 8, padding: '6px 16px', borderRadius: 4, background: '#111', color: '#fff', fontSize: '0.82rem', fontWeight: 500 }}>
                        联系管理员接单
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: '#f5f5f5', borderRadius: 4, fontSize: '0.8rem', color: '#999', textAlign: 'center', lineHeight: 1.8 }}>
          匹配度说明：高度匹配=学科+年级+区域都吻合 · 中度匹配=学科或年级任一吻合且区域相同 · 低度匹配=仅学科或年级吻合<br />
          为保护家长隐私，联系方式已隐藏。如需接单，请联系管理员。
        </div>
      </div>
    </div>
  )
}
