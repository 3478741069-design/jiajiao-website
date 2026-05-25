const BASE = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api'

let authToken = localStorage.getItem('jiajiao_token') || ''

export function setToken(t: string) {
  authToken = t
  localStorage.setItem('jiajiao_token', t)
}

export function clearToken() {
  authToken = ''
  localStorage.removeItem('jiajiao_token')
}

export function getToken() {
  return authToken
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as any) }
  if (authToken) headers['Authorization'] = `Bearer ${authToken}`
  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || '请求失败')
  return data
}

export interface ApiTeacher {
  id: number
  name: string
  initial: string
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
  rating: number
  students: number
  experience: string
}

export const api = {
  async login(phone: string, password: string) {
    const data = await request('/login', { method: 'POST', body: JSON.stringify({ phone, password }) })
    setToken(data.token)
    return data.teacher as ApiTeacher
  },

  async register(form: any) {
    const data = await request('/register', { method: 'POST', body: JSON.stringify(form) })
    setToken(data.token)
    return data.teacher as ApiTeacher
  },

  async getTeachers() {
    return await request('/teachers') as ApiTeacher[]
  },

  async getProfile() {
    return await request('/teacher/profile')
  },
}
