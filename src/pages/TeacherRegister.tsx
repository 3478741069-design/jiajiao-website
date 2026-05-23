import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTeacher } from '../TeacherContext'

const subjectOptions = ['数学', '英语', '语文', '物理', '化学', '生物', '历史', '地理', '编程', '钢琴', '美术', '书法', '其他']
const gradeOptions = ['小学', '初中', '高中', '大学', '成人']
const yearOptions = ['大一', '大二', '大三', '大四', '研究生']
const districtOptions = ['芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '望城区', '长沙县', '其他']

export default function TeacherRegister() {
  const { register } = useTeacher()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', phone: '', password: '', gender: '男', age: 20, year: '大二',
    university: '', major: '',
    subjects: [] as string[], grades: [] as string[], district: '', price: 80,
    description: '', videoUrl: '', tags: '' as string,
    lat: 28.175, lng: 112.98,
  })
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)

  const toggleArray = (field: 'subjects' | 'grades', value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }))
  }

  useEffect(() => {
    if (!mapRef.current || step !== 2) return

    const map = L.map(mapRef.current, {
      center: [form.lat, form.lng],
      zoom: 13,
      minZoom: 11,
      maxBounds: L.latLngBounds([28.05, 112.85], [28.35, 113.15]),
      maxBoundsViscosity: 0.8,
    })

    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
      subdomains: ['1', '2', '3', '4'],
      maxZoom: 18,
    }).addTo(map)

    mapInstanceRef.current = map

    const icon = L.divIcon({
      className: '',
      html: '<div style="width:20px;height:20px;border-radius:50%;background:#111;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })
    markerRef.current = L.marker([form.lat, form.lng], { icon }).addTo(map)

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      setForm((prev) => ({ ...prev, lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) }))
      if (markerRef.current) markerRef.current.remove()
      markerRef.current = L.marker([lat, lng], { icon }).addTo(map)
    })

    return () => { map.remove(); mapInstanceRef.current = null }
  }, [step])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.subjects.length) { setError('请至少选择一个辅导学科'); return }
    if (!form.grades.length) { setError('请至少选择一个辅导年级'); return }
    if (!form.district) { setError('请选择所在区域'); return }
    if (!form.name || !form.phone || !form.password || !form.university || !form.major) {
      setError('请填写所有必填项'); return
    }
    if (form.phone.length !== 11) { setError('请输入正确的11位手机号'); return }
    if (form.password.length < 6) { setError('密码至少6位'); return }

    setSubmitting(true)
    const result = await register({
      ...form,
      tags: form.tags.split(/[,，]/).map((s) => s.trim()).filter(Boolean),
    })
    setSubmitting(false)

    if (result.success) {
      navigate('/teacher/profile', { replace: true })
    } else {
      setError(result.error || '注册失败，请稍后重试')
    }
  }

  return (
    <div style={{ background: 'var(--bg-subtle)', minHeight: 'calc(100vh - 56px)', padding: '60px 0 80px' }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>老师注册</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 32 }}>填写以下资料即可加入长沙大学生家教平台</p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 'var(--radius)', background: '#fef2f2', color: '#e53935', fontSize: '0.85rem', marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <button type="button" onClick={() => setStep(1)} className="btn" style={{
              background: step === 1 ? 'var(--primary)' : 'var(--bg)',
              color: step === 1 ? '#fff' : 'var(--text-secondary)',
              border: step === 1 ? 'none' : '1px solid var(--border)',
              flex: 1,
            }}>1. 基本信息</button>
            <button type="button" onClick={() => setStep(2)} className="btn" style={{
              background: step === 2 ? 'var(--primary)' : 'var(--bg)',
              color: step === 2 ? '#fff' : 'var(--text-secondary)',
              border: step === 2 ? 'none' : '1px solid var(--border)',
              flex: 1,
            }}>2. 教学信息</button>
            <button type="button" onClick={() => setStep(3)} className="btn" style={{
              background: step === 3 ? 'var(--primary)' : 'var(--bg)',
              color: step === 3 ? '#fff' : 'var(--text-secondary)',
              border: step === 3 ? 'none' : '1px solid var(--border)',
              flex: 1,
            }}>3. 位置确认</button>
          </div>

          {step === 1 && (
            <div className="card" style={{ padding: 32 }}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label required">姓名</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="真实姓名" required />
                </div>
                <div className="form-group">
                  <label className="form-label required">性别</label>
                  <div style={{ display: 'flex', gap: 16 }}>
                    {['男', '女'].map((g) => (
                      <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input type="radio" value={g} checked={form.gender === g} onChange={(e) => setForm({ ...form, gender: e.target.value })} />{g}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label required">年龄</label>
                  <input className="form-input" type="number" min={18} max={30} value={form.age} onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) || 20 })} required />
                </div>
                <div className="form-group">
                  <label className="form-label required">年级</label>
                  <select className="form-select" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required>
                    {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">学校</label>
                  <input className="form-input" value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })} placeholder="如：湖南师范大学" required />
                </div>
                <div className="form-group">
                  <label className="form-label required">专业</label>
                  <input className="form-input" value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} placeholder="如：数学与应用数学" required />
                </div>
                <div className="form-group">
                  <label className="form-label required">手机号（用于登录）</label>
                  <input className="form-input" type="tel" maxLength={11} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="11位手机号" required />
                </div>
                <div className="form-group">
                  <label className="form-label required">密码（用于登录）</label>
                  <input className="form-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="至少6位" required />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card" style={{ padding: 32 }}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label required">辅导学科（可多选）</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {subjectOptions.map((s) => (
                      <button key={s} type="button" onClick={() => toggleArray('subjects', s)} style={{
                        padding: '6px 14px', borderRadius: 'var(--radius)', fontSize: '0.85rem',
                        border: form.subjects.includes(s) ? '1px solid var(--text)' : '1px solid var(--border)',
                        background: form.subjects.includes(s) ? 'var(--text)' : 'var(--bg)',
                        color: form.subjects.includes(s) ? '#fff' : 'var(--text-secondary)',
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group full-width">
                  <label className="form-label required">辅导年级（可多选）</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {gradeOptions.map((g) => (
                      <button key={g} type="button" onClick={() => toggleArray('grades', g)} style={{
                        padding: '6px 14px', borderRadius: 'var(--radius)', fontSize: '0.85rem',
                        border: form.grades.includes(g) ? '1px solid var(--text)' : '1px solid var(--border)',
                        background: form.grades.includes(g) ? 'var(--text)' : 'var(--bg)',
                        color: form.grades.includes(g) ? '#fff' : 'var(--text-secondary)',
                      }}>{g}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label required">课时费（元/小时）</label>
                  <input className="form-input" type="number" min={50} max={500} value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 80 })} required />
                </div>
                <div className="form-group">
                  <label className="form-label">自我介绍视频链接</label>
                  <input className="form-input" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="可选，视频URL" />
                </div>
                <div className="form-group full-width">
                  <label className="form-label required">个人介绍</label>
                  <textarea className="form-input" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="介绍一下自己的优势、教学风格等" required style={{ resize: 'vertical' }} />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">个人标签（用逗号分隔）</label>
                  <input className="form-input" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="如：高考数学142, 耐心细致, 带过初三冲刺" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card" style={{ padding: 32 }}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label required">所在区域</label>
                  <select className="form-select" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required>
                    <option value="">请选择</option>
                    {districtOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group full-width">
                  <label className="form-label">在地图上点击选择您的上课位置</label>
                  <div ref={mapRef} style={{ width: '100%', height: 300, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 6 }}>
                    已选坐标：{form.lat}, {form.lng}（点击地图即可更改）
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {step > 1 && (
              <button type="button" className="btn" onClick={() => setStep(step - 1)}>上一步</button>
            )}
            {step < 3 ? (
              <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)} style={{ flex: 1 }}>下一步</button>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={submitting}>
                {submitting ? '提交中...' : '提交注册'}
              </button>
            )}
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>已有账号？</span>
          <Link to="/teacher/login" style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.85rem' }}>去登录</Link>
        </div>
      </div>
    </div>
  )
}
