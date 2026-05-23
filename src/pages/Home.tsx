import { Link } from 'react-router-dom'
import { useState } from 'react'

const features = [
  { title: '大学生师资', desc: '全部来自长沙本地高校的在校大学生，同龄人更懂学生，沟通无障碍。' },
  { title: '价格透明', desc: '课时费全部明确标价，家长直接付给老师，平台不抽成、不加价。' },
  { title: '免费试听', desc: '每位老师都支持免费试听一节课，满意再付款，不满意无条件更换。' },
  { title: '家长省心', desc: '提交需求后1小时内匹配，定期回访学生学习情况，全程无忧。' },
]

const stats = [
  { num: '500+', label: '在校大学生老师' },
  { num: '3000+', label: '已服务学生' },
  { num: '98%', label: '家长满意度' },
  { num: '60元起', label: '课时费' },
]

const subjects = ['数学', '英语', '语文', '物理', '化学', '生物', '历史', '地理', '编程', '钢琴', '美术', '书法']
const grades = ['小学', '初中', '高中']

const testimonials = [
  { name: '王女士', role: '雨花区 · 初三家长', content: '给孩子找了中南大学的小张老师，孩子说比学校老师讲得还清楚，数学三个月从60多分涨到了85分，费用也很合理。' },
  { name: '李同学', role: '岳麓区 · 高二学生', content: '湖南师大的学姐教英语特别耐心，不光是讲题，还会分享学习方法，比我之前上培训班效果好多了。' },
  { name: '陈先生', role: '开福区 · 小四家长', content: '周六提交需求，周日下午就安排了试听。大学生老师认真负责，孩子很喜欢，已经上了一学期了。' },
]

export default function Home() {
  const [searchSubject, setSearchSubject] = useState('')
  const [searchGrade, setSearchGrade] = useState('')

  return (
    <div>
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', padding: '120px 0 100px' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 16, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            大学生家教，更懂孩子的老师
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 48 }}>
            长沙本地高校在校大学生，同龄人辅导，价格亲民，免费试听
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>学科</div>
              <select className="form-select" value={searchSubject} onChange={(e) => setSearchSubject(e.target.value)}>
                <option value="">全部</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 6 }}>年级</div>
              <select className="form-select" value={searchGrade} onChange={(e) => setSearchGrade(e.target.value)}>
                <option value="">全部</option>
                {grades.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <Link
              to={`/teachers${searchSubject ? `?subject=${searchSubject}` : ''}${searchGrade ? `${searchSubject ? '&' : '?'}grade=${searchGrade}` : ''}`}
              className="btn btn-primary btn-lg"
              style={{ height: 44, whiteSpace: 'nowrap' }}
            >
              查找老师
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '56px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--text)' }}>{s.num}</div>
              <div style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <h2 className="section-title">为什么选择我们</h2>
          <p className="section-subtitle">为家长省钱，为学生找到好老师</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 32 }}>
            {features.map((f) => (
              <div key={f.title} style={{ padding: 40 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24, fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)',
                }}>0{features.indexOf(f) + 1}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="section-title">三步找到好老师</h2>
          <p className="section-subtitle">简单高效</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {[
              { step: '1', title: '发布需求', desc: '填写学生年级、学科、预算、所在区域' },
              { step: '2', title: '匹配老师', desc: '推荐合适的大学生老师，家长自主选择' },
              { step: '3', title: '免费试听', desc: '试听满意再付款，不满意免费换老师' },
            ].map((item) => (
              <div key={item.step}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)',
                }}>{item.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6, color: 'var(--text)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <Link to="/needs" className="btn btn-primary btn-lg">发布家教需求</Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-subtle)' }}>
        <div className="container">
          <h2 className="section-title">家长和学生的真实反馈</h2>
          <p className="section-subtitle"></p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ padding: 32 }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{t.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>{t.role}</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>{t.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>为孩子找一位合适的大学生老师</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 40 }}>
            免费发布需求，1小时内匹配合适的老师，试听满意再付款
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/needs" className="btn btn-primary btn-lg">免费发布需求</Link>
            <Link to="/teachers" className="btn btn-lg">浏览老师库</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
