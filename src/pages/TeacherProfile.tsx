import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTeacher } from '../TeacherContext'
import { api } from '../lib/api'

interface ProfileData {
  name: string
  gender: string
  age: number
  year: string
  university: string
  major: string
  subjects: string[]
  grades: string[]
  price: number
  description: string
  video_url: string
  tags: string[]
  district: string
  rating: number
  student_count: number
  experience: string
}

export default function TeacherProfile() {
  const { teacher, loading, logout } = useTeacher()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (loading) return
    if (!teacher) {
      navigate('/teacher/login', { replace: true })
      return
    }

    api.getProfile()
      .then((data) => { setProfile(data); setFetching(false) })
      .catch(() => { setFetching(false) })
  }, [teacher, loading])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (fetching || loading) {
    return (
      <div style={{ background: 'var(--bg-subtle)', minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>加载中...</p>
      </div>
    )
  }

  if (!profile) {
    return (
      <div style={{ background: 'var(--bg-subtle)', minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>未找到您的老师资料</p>
          <Link to="/teacher/register" className="btn btn-primary">去注册</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-subtle)', minHeight: 'calc(100vh - 56px)', padding: '48px 0 80px' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)' }}>我的资料</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
              您的信息已公开展示在老师库中
            </p>
          </div>
          <button className="btn" onClick={handleLogout} style={{ fontSize: '0.85rem' }}>退出登录</button>
        </div>

        <div className="card" style={{ padding: 32, marginBottom: 20 }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 20, color: 'var(--text)' }}>基本信息</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 32px', fontSize: '0.9rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>姓名：</span>{profile.name}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>性别：</span>{profile.gender}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>年龄：</span>{profile.age}岁</div>
            <div><span style={{ color: 'var(--text-muted)' }}>年级：</span>{profile.year}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>学校：</span>{profile.university}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>专业：</span>{profile.major}</div>
            <div><span style={{ color: 'var(--text-muted)' }}>评分：</span>{profile.rating}分</div>
            <div><span style={{ color: 'var(--text-muted)' }}>区域：</span>{profile.district}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 32, marginBottom: 20 }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 20, color: 'var(--text)' }}>教学信息</div>
          <div style={{ display: 'grid', gap: 12, fontSize: '0.9rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>辅导学科：</span>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                {profile.subjects.map((s) => (
                  <span key={s} style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.8rem', background: '#111', color: '#fff' }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>辅导年级：</span>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                {profile.grades.map((g) => (
                  <span key={g} style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.8rem', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{g}</span>
                ))}
              </div>
            </div>
            <div><span style={{ color: 'var(--text-muted)' }}>课时费：</span>¥{profile.price}/小时</div>
            <div><span style={{ color: 'var(--text-muted)' }}>个人介绍：</span>{profile.description}</div>
            {profile.tags && profile.tags.length > 0 && (
              <div>
                <span style={{ color: 'var(--text-muted)' }}>标签：</span>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                  {profile.tags.map((tag) => (
                    <span key={tag} style={{ padding: '2px 8px', borderRadius: 2, fontSize: '0.8rem', background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/teacher/dashboard" className="btn" style={{ flex: 1 }}>返回工作台</Link>
        </div>
      </div>
    </div>
  )
}
