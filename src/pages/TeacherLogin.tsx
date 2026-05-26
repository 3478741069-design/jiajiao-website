import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTeacher } from '../TeacherContext'

export default function TeacherLogin() {
  const { login, adminLogin, teacher, loading } = useTeacher()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && teacher) {
    if (teacher.role === 'admin') {
      navigate('/admin/needs', { replace: true })
    } else {
      navigate('/teacher/dashboard', { replace: true })
    }
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const adminResult = await adminLogin(phone, password)
    if (adminResult.success) {
      setSubmitting(false)
      navigate('/admin/needs', { replace: true })
      return
    }

    const result = await login(phone, password)
    setSubmitting(false)
    if (result.success) {
      navigate('/teacher/dashboard', { replace: true })
    } else {
      setError('手机号或密码错误，请重试')
    }
  }

  return (
    <div style={{ background: 'var(--bg-subtle)', minHeight: 'calc(100vh - 56px)', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: 400 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>老师登录</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32 }}>登录后可以查看和管理您的资料</p>

        <div className="card" style={{ padding: 32 }}>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ padding: '10px 14px', borderRadius: 4, background: '#fef2f2', color: '#e53935', fontSize: '0.85rem', marginBottom: 20 }}>
                {error}
              </div>
            )}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label required">手机号码</label>
              <input className="form-input" type="tel" placeholder="请输入注册时填写的手机号" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label className="form-label required">密码</label>
              <input className="form-input" type="password" placeholder="请输入密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? '登录中...' : '登录'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            还没有账号？<Link to="/teacher/register" style={{ color: 'var(--text)', fontWeight: 600 }}>立即注册</Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>返回首页</Link>
        </div>
      </div>
    </div>
  )
}
