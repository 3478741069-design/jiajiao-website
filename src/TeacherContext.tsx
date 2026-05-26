import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { api, clearToken, getToken, type ApiTeacher } from './lib/api'

interface TeacherSession {
  name: string
  role: 'teacher' | 'admin'
}

interface TeacherContextType {
  teacher: TeacherSession | null
  loading: boolean
  login: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  adminLogin: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: any) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loadTeachers: () => Promise<ApiTeacher[]>
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<TeacherSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('jiajiao_session')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTeacher(parsed)
      } catch {}
    }
    if (getToken()) {
      const savedRole = localStorage.getItem('jiajiao_role')
      if (savedRole === 'admin') {
        setTeacher({ name: '管理员', role: 'admin' })
      } else {
        api.getProfile().then((p) => {
          const session = { name: p.name, role: 'teacher' as const }
          setTeacher(session)
          localStorage.setItem('jiajiao_session', JSON.stringify(session))
        }).catch(clearToken)
      }
    }
    setLoading(false)
  }, [])

  const login = async (phone: string, password: string) => {
    try {
      const t = await api.login(phone, password)
      const session = { name: t.name, role: 'teacher' as const }
      setTeacher(session)
      localStorage.setItem('jiajiao_session', JSON.stringify(session))
      localStorage.setItem('jiajiao_role', 'teacher')
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const adminLogin = async (username: string, password: string) => {
    try {
      const data = await api.adminLogin(username, password)
      const session = { name: '管理员', role: 'admin' as const }
      setTeacher(session)
      localStorage.setItem('jiajiao_session', JSON.stringify(session))
      localStorage.setItem('jiajiao_role', 'admin')
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const register = async (data: any) => {
    try {
      const t = await api.register(data)
      const session = { name: t.name, role: 'teacher' as const }
      setTeacher(session)
      localStorage.setItem('jiajiao_session', JSON.stringify(session))
      localStorage.setItem('jiajiao_role', 'teacher')
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    clearToken()
    localStorage.removeItem('jiajiao_session')
    localStorage.removeItem('jiajiao_role')
    setTeacher(null)
  }

  const loadTeachers = async () => {
    try {
      return await api.getTeachers()
    } catch {
      return []
    }
  }

  return (
    <TeacherContext.Provider value={{ teacher, loading, login, adminLogin, register, logout, loadTeachers }}>
      {children}
    </TeacherContext.Provider>
  )
}

export function useTeacher() {
  const ctx = useContext(TeacherContext)
  if (!ctx) throw new Error('useTeacher must be inside TeacherProvider')
  return ctx
}
