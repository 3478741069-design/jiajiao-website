import express from 'express'
import cors from 'cors'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Pool } = pg
const app = express()
const PORT = 3001
const JWT_SECRET = process.env.JWT_SECRET || 'jiajiao-secret-key-change-me'

app.use(cors({ origin: true }))
app.use(express.json())

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'jiajiao',
  user: process.env.DB_USER || 'jiajiao',
  password: process.env.DB_PASS || 'jiajiao123',
})

function signToken(payload: { id: number; phone: string; name: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: '未登录' })
    return
  }
  try {
    const token = header.slice(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; phone: string; name: string }
    ;(req as any).user = decoded
    next()
  } catch {
    res.status(401).json({ error: '登录已过期' })
  }
}

app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, password, gender, age, year, subjects, grades, price, university, major, description, videoUrl, tags, district, lat, lng } = req.body

    if (!name || !phone || !password || !university || !major || !district) {
      res.status(400).json({ error: '请填写所有必填项' })
      return
    }

    const existing = await pool.query('SELECT id FROM teachers WHERE phone = $1', [phone])
    if (existing.rows.length > 0) {
      res.status(400).json({ error: '该手机号已注册' })
      return
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const initial = name.charAt(0)
    const tagList = Array.isArray(tags) ? tags : []

    const result = await pool.query(
      `INSERT INTO teachers (name, initial, phone, password_hash, gender, age, year, subjects, grades, price, university, major, description, video_url, tags, district, lat, lng)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
       RETURNING id, name, phone`,
      [name, initial, phone, passwordHash, gender, age, year, subjects, grades, price, university, major, description, videoUrl || '', tagList, district, lat, lng]
    )

    const teacher = result.rows[0]
    const token = signToken({ id: teacher.id, phone, name })

    res.json({ success: true, token, teacher })
  } catch (err: any) {
    console.error('注册失败:', err)
    res.status(500).json({ error: '注册失败: ' + err.message })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body

    const result = await pool.query('SELECT * FROM teachers WHERE phone = $1', [phone])
    if (result.rows.length === 0) {
      res.status(401).json({ error: '手机号未注册' })
      return
    }

    const teacher = result.rows[0]
    const valid = await bcrypt.compare(password, teacher.password_hash)
    if (!valid) {
      res.status(401).json({ error: '密码错误' })
      return
    }

    const token = signToken({ id: teacher.id, phone, name: teacher.name })

    res.json({
      success: true,
      token,
      teacher: {
        id: teacher.id,
        name: teacher.name,
        phone: teacher.phone,
        gender: teacher.gender,
        age: teacher.age,
        year: teacher.year,
        subjects: teacher.subjects,
        grades: teacher.grades,
        price: teacher.price,
        university: teacher.university,
        major: teacher.major,
        description: teacher.description,
        videoUrl: teacher.video_url,
        tags: teacher.tags,
        district: teacher.district,
        lat: teacher.lat,
        lng: teacher.lng,
        rating: teacher.rating,
        students: teacher.student_count,
        experience: teacher.experience,
      },
    })
  } catch (err: any) {
    console.error('登录失败:', err)
    res.status(500).json({ error: '登录失败' })
  }
})

app.get('/api/teachers', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM teachers ORDER BY rating DESC')
    const teachers = result.rows.map((t) => ({
      id: t.id,
      name: t.name,
      initial: t.initial,
      gender: t.gender,
      age: t.age,
      year: t.year,
      subjects: t.subjects,
      grades: t.grades,
      price: t.price,
      university: t.university,
      major: t.major,
      description: t.description,
      videoUrl: t.video_url,
      tags: t.tags,
      district: t.district,
      lat: parseFloat(t.lat),
      lng: parseFloat(t.lng),
      rating: parseFloat(t.rating),
      students: t.student_count,
      experience: t.experience,
    }))
    res.json(teachers)
  } catch (err) {
    console.error('加载老师列表失败:', err)
    res.status(500).json({ error: '加载失败' })
  }
})

app.get('/api/teacher/profile', authMiddleware, async (req, res) => {
  try {
    const { phone } = (req as any).user
    const result = await pool.query('SELECT * FROM teachers WHERE phone = $1', [phone])
    if (result.rows.length === 0) {
      res.status(404).json({ error: '未找到' })
      return
    }
    const t = result.rows[0]
    res.json({
      name: t.name,
      gender: t.gender,
      age: t.age,
      year: t.year,
      university: t.university,
      major: t.major,
      subjects: t.subjects,
      grades: t.grades,
      price: t.price,
      description: t.description,
      video_url: t.video_url,
      tags: t.tags,
      district: t.district,
      lat: parseFloat(t.lat),
      lng: parseFloat(t.lng),
      rating: parseFloat(t.rating),
      student_count: t.student_count,
      experience: t.experience,
    })
  } catch (err) {
    res.status(500).json({ error: '加载失败' })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API 服务已启动: http://localhost:${PORT}`)
})
