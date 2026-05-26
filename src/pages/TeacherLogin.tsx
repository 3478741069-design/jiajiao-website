import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTeacher } from '../TeacherContext'

export default function TeacherLogin() {
  const { login, adminLogin, teacher, loading } = useTeacher()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'teacher' | 'admin'>('teacher')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && teacher) {
    if (teacher.role === 'admin') {
      navigate('/admin/needs', { replace: true })
    } else {
      navigate('/teacher/profile', { replace: true })
    }
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    if (mode === 'admin') {
      const result = await adminLogin(phone, password)
      setSubmitting(false)
      if (result.success) {
        navigate('/admin/needs', { replace: true })
      } else {
        setError(result.error || '管理员账号或密码错误')
      }
    } else {
      const result = await login(phone, password)
      setSubmitting(false)
      if (result.success) {
        navigate('/teacher/profile', { replace: true })
      } else {
        setError(result.error || '登录失败，请检查手机号和密码')
      }
    }
  }

  return (
    <div style={{ background: 'var(--bg-subtle)', minHeight: 'calc(100vh - 56px)', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: 400 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>
          {mode === 'admin' ? '管理员登录' : '老师登录'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
          {mode === 'admin' ? '需使用管理员专用账号登录' : '登录后可以查看和管理您的资料'}
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => { setMode('teacher'); setError('') }}
            style={{
              flex: 1, padding: '8px 16px', borderRadius: 4, fontSize: '0.85rem', border: 'none',
              background: mode === 'teacher' ? '#111' : '#f5f5f5',
              color: mode === 'teacher' ? '#fff' : '#555', fontWeight: mode === 'teacher' ? 600 : 400,
            }}
          >
            老师登录
          </button>
          <button
            type="button"
            onClick={() => { setMode('admin'); setError('') }}
            style={{
              flex: 1, padding: '8px 16px', borderRadius: 4, fontSize: '0.85rem', border: 'none',
              background: mode === 'admin' ? '#111' : '#f5f5f5',
              color: mode === 'admin' ? '#fff' : '#555', fontWeight: mode === 'admin' ? 600 : 400,
            }}
          >
            管理员登录
          </button>
        </div>

        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 4, background: '#fef2f2', color: '#e53935', fontSize: '0.85rem', marginBottom: 20 }}>
                {error}
              </div>
            )}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label required">
                {mode === 'admin' ? '管理员账号' : '手机号码'}
              </label>
              <input
                className="form-input"
                type={mode === 'admin' ? 'text' : 'tel'}
                placeholder={mode === 'admin' ? '请输入管理员账号' : '请输入注册时填写的手机号'}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label required">密码</label>
              <input
                className="form-input"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? '登录中...' : '登录'}
            </button>
          </form>

          {mode === 'teacher' && (
            <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              还没有账号？<Link to="/teacher/register" style={{ color: 'var(--text)', fontWeight: 600 }}>立即注册</Link>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>返回首页</Link>
        </div>
      </div>
    </div>
  )
}
