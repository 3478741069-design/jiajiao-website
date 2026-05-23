import { useState, type FormEvent } from 'react'

const subjectOptions = ['数学', '英语', '语文', '物理', '化学', '生物', '历史', '地理', '编程', '钢琴', '美术', '其他']
const gradeOptions = ['学前', '小学', '初一', '初二', '初三', '高一', '高二', '高三', '大学', '成人']
const frequencyOptions = ['每周1次', '每周2次', '每周3次', '每周4次以上']
const budgetRanges = ['100-150元/小时', '150-200元/小时', '200-300元/小时', '300元以上/小时', '面议']
const districtOptions = ['芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '望城区', '长沙县', '其他']

interface FormData {
  studentGrade: string; subjects: string[]; frequency: string; budget: string
  teacherGender: string; district: string; address: string
  studentName: string; parentName: string; phone: string; notes: string
}

export default function NeedPost() {
  const [form, setForm] = useState<FormData>({
    studentGrade: '', subjects: [], frequency: '', budget: '',
    teacherGender: '不限', district: '', address: '',
    studentName: '', parentName: '', phone: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const toggleSubject = (s: string) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(s) ? prev.subjects.filter((item) => item !== s) : [...prev.subjects, s],
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div style={{ background: 'var(--bg-subtle)', minHeight: '70vh', paddingTop: 80 }}>
        <div className="container" style={{ maxWidth: 520, textAlign: 'center' }}>
          <div className="card" style={{ padding: 60 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f5f5', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.3rem', fontWeight: 600 }}>✓</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>提交成功</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32 }}>
              客服将在<strong>30分钟内</strong>与您电话联系，为您匹配合适的长沙大学生老师。
            </p>
            <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius)', padding: 24, textAlign: 'left', marginBottom: 32 }}>
              <div style={{ fontWeight: 600, marginBottom: 12, color: 'var(--text)', fontSize: '0.9rem' }}>需求摘要</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <div>年级：{form.studentGrade}</div>
                <div>学科：{form.subjects.join('、')}</div>
                <div>频次：{form.frequency}</div>
                <div>预算：{form.budget}</div>
                <div>区域：{form.district}</div>
                <div>地址：{form.address}</div>
                <div>电话：{form.phone}</div>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ studentGrade: '', subjects: [], frequency: '', budget: '', teacherGender: '不限', district: '', address: '', studentName: '', parentName: '', phone: '', notes: '' }) }}>
              再发布一条
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-subtle)', paddingBottom: 80 }}>
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', padding: '48px 0 36px' }}>
        <div className="container">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)' }}>免费发布家教需求</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>填写信息后，我们将为您匹配合适的大学生老师，试听满意再付款</p>
        </div>
      </section>

      <div className="container" style={{ marginTop: 40, maxWidth: 680 }}>
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: 36, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 24, color: 'var(--text)' }}>学习需求</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label required">学生年级</label>
                <select className="form-select" value={form.studentGrade} onChange={(e) => setForm({ ...form, studentGrade: e.target.value })} required>
                  <option value="">请选择</option>
                  {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group full-width">
                <label className="form-label required">辅导学科（可多选）</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {subjectOptions.map((s) => (
                    <button key={s} type="button" onClick={() => toggleSubject(s)} style={{
                      padding: '6px 16px', borderRadius: 'var(--radius)', fontSize: '0.85rem',
                      border: form.subjects.includes(s) ? '1px solid var(--text)' : '1px solid var(--border)',
                      background: form.subjects.includes(s) ? 'var(--text)' : 'var(--bg)',
                      color: form.subjects.includes(s) ? '#fff' : 'var(--text-secondary)',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label required">上课频率</label>
                <select className="form-select" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} required>
                  <option value="">请选择</option>
                  {frequencyOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">课时预算</label>
                <select className="form-select" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} required>
                  <option value="">请选择</option>
                  {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">所在区域</label>
                <select className="form-select" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required>
                  <option value="">请选择</option>
                  {districtOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required">详细地址</label>
                <input className="form-input" type="text" placeholder="如：岳麓区梅溪湖XX小区" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 36, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 24, color: 'var(--text)' }}>联系信息</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">学生姓名</label>
                <input className="form-input" type="text" placeholder="请输入" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label required">家长称呼</label>
                <input className="form-input" type="text" placeholder="请输入" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label required">手机号码</label>
                <input className="form-input" type="tel" placeholder="请输入" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="form-group full-width">
                <label className="form-label">备注要求</label>
                <textarea className="form-input" rows={4} placeholder="如有特殊要求请在此说明" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: 180 }}>提交需求</button>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 12 }}>提交后客服将在30分钟内与您联系</p>
          </div>
        </form>
      </div>
    </div>
  )
}
