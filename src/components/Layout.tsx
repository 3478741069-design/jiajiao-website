import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTeacher } from '../TeacherContext'

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/teachers', label: '找老师' },
  { path: '/needs', label: '发布需求' },
]

export default function Layout() {
  const location = useLocation()
  const { teacher } = useTeacher()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <header style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
          <Link to="/" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }} onClick={closeMenu}>
            优学家教
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
              border: 'none', background: 'none', color: 'var(--text)', fontSize: '1.3rem',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link"
                  style={{
                    fontSize: '0.9rem',
                    color: isActive ? 'var(--text)' : 'var(--text-muted)',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
            {teacher ? (
              <Link
                to={teacher.role === 'admin' ? '/admin/needs' : '/teacher/dashboard'}
                className="nav-link"
                style={{ fontSize: '0.85rem', color: 'var(--text)' }}
              >
                {teacher.role === 'admin' ? '管理后台' : teacher.name}
              </Link>
            ) : (
              <Link to="/teacher/login" className="nav-link" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                登录
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {menuOpen && (
        <div className="mobile-menu-dropdown" style={{
          position: 'fixed', top: 56, left: 0, right: 0, bottom: 0,
          background: 'var(--bg)', zIndex: 99, padding: '16px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                style={{
                  padding: '14px 0', fontSize: '1.05rem',
                  color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {link.label}
              </Link>
            )
          })}
          {teacher ? (
            <Link
              to={teacher.role === 'admin' ? '/admin/needs' : '/teacher/dashboard'}
              onClick={closeMenu}
              style={{
                padding: '14px 0', fontSize: '1.05rem',
                color: 'var(--text)', fontWeight: 600,
                borderBottom: '1px solid var(--border)',
              }}
            >
              {teacher.role === 'admin' ? '管理后台' : teacher.name}
            </Link>
          ) : (
            <Link
              to="/teacher/login"
              onClick={closeMenu}
              style={{
                padding: '14px 0', fontSize: '1.05rem',
                color: 'var(--text-secondary)', fontWeight: 400,
                borderBottom: '1px solid var(--border)',
              }}
            >
              登录
            </Link>
          )}
        </div>
      )}

      <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0 32px', marginTop: 80 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 16, color: 'var(--text)' }}>优学家教</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                长沙大学生家教平台，为家长和学生找到合适的大学生老师。
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 12, color: 'var(--text)', fontSize: '0.9rem' }}>导航</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 12, color: 'var(--text)', fontSize: '0.9rem' }}>联系</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                电话：0731-88886666<br />
                邮箱：cs@youxue.com<br />
                地址：长沙市岳麓区麓谷大道668号
              </p>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', marginTop: 32, paddingTop: 24, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © 2024 优学家教
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .nav-link {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
