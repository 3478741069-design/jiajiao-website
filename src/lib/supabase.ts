import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 未配置，请创建 .env 文件并填入 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
)

export interface DbTeacher {
  id: string
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
  video_url: string
  tags: string[]
  district: string
  lat: number
  lng: number
  rating: number
  student_count: number
  experience: string
  created_at: string
}

export function dbToTeacher(db: DbTeacher) {
  return {
    id: db.id,
    name: db.name,
    initial: db.initial,
    gender: db.gender,
    age: db.age,
    year: db.year,
    subjects: db.subjects,
    grades: db.grades,
    price: db.price,
    university: db.university,
    major: db.major,
    description: db.description,
    videoUrl: db.video_url,
    tags: db.tags,
    district: db.district,
    lat: db.lat,
    lng: db.lng,
    rating: db.rating,
    students: db.student_count,
    experience: db.experience,
  }
}
