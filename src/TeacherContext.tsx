import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase, dbToTeacher } from './lib/supabase'

interface TeacherSession {
  name: string
}

interface TeacherContextType {
  teacher: TeacherSession | null
  loading: boolean
  login: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: TeacherInput) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  loadTeachers: () => Promise<any[]>
}

export interface TeacherInput {
  name: string
  gender: string
  age: number
  year: string
  subjects: string[]
  grades: string[]
  price: number
  university: string
  major: string
  description: string
  videoUrl: string
  tags: string[]
  district: string
  lat: number
  lng: number
  phone: string
  password: string
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<TeacherSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setTeacher({ name: session.user.user_metadata?.name || '' })
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setTeacher({ name: session.user.user_metadata?.name || '' })
      } else {
        setTeacher(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (phone: string, password: string) => {
    const email = `${phone}@jiajiao.local`
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, error: error.message }
    return { success: true }
  }

  const register = async (data: TeacherInput) => {
    const email = `${data.phone}@jiajiao.local`

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password: data.password,
      options: {
        data: { name: data.name },
      },
    })

    if (signUpError) return { success: false, error: signUpError.message }

    const tags = Array.isArray(data.tags) ? data.tags : data.tags.split(/[,，]/).map((s) => s.trim()).filter(Boolean)

    const { error: insertError } = await supabase.from('teachers').insert({
      name: data.name,
      initial: data.name.charAt(0),
      gender: data.gender,
      age: data.age,
      year: data.year,
      subjects: data.subjects,
      grades: data.grades,
      price: data.price,
      university: data.university,
      major: data.major,
      description: data.description,
      video_url: data.videoUrl,
      tags,
      district: data.district,
      lat: data.lat,
      lng: data.lng,
    })

    if (insertError) return { success: false, error: insertError.message }

    return { success: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  const loadTeachers = async () => {
    const { data, error } = await supabase.from('teachers').select('*').order('rating', { ascending: false })
    if (error) {
      console.error('加载老师列表失败:', error)
      return []
    }
    return data.map(dbToTeacher)
  }

  return (
    <TeacherContext.Provider value={{ teacher, loading, login, register, logout, loadTeachers }}>
      {children}
    </TeacherContext.Provider>
  )
}

export function useTeacher() {
  const ctx = useContext(TeacherContext)
  if (!ctx) throw new Error('useTeacher must be inside TeacherProvider')
  return ctx
}
