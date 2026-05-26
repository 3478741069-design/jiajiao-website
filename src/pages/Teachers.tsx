import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { allTeachers as staticTeachers, type Teacher } from '../data/teachers'
import { useTeacher } from '../TeacherContext'
import VideoModal from '../components/VideoModal'
import TeacherDetailModal from '../components/TeacherDetailModal'

function createTeacherIcon(num: number, isHighlight: boolean) {
  const bg = isHighlight ? '#111' : '#555'
  const size = isHighlight ? 26 : 22
  return L.divIcon({
    className: 'teacher-marker',
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${bg};color:#fff;
      display:flex;align-items:center;justify-content:center;
      font-size:11px;font-weight:600;
      border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.2);
    ">${num}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  })
}

export default function Teachers() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const { loadTeachers } = useTeacher()
  const [subject, setSubject] = useState(searchParams.get('subject') || '')
  const [grade, setGrade] = useState(searchParams.get('grade') || '')
  const [district, setDistrict] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [highlightId, setHighlightId] = useState<number | string | null>(null)
  const [videoTeacher, setVideoTeacher] = useState<Teacher | null>(null)
  const [detailTeacher, setDetailTeacher] = useState<Teacher | null>(null)
  const [dbTeachers, setDbTeachers] = useState<Teacher[]>(staticTeachers as Teacher[])
  const [mapReady, setMapReady] = useState(false)

  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<Map<number | string, L.Marker>>(new Map())
  const cardRefs = useRef<Map<number | string, HTMLDivElement>>(new Map())

  useEffect(() => {
    loadTeachers().then((data) => {
      if (data.length > 0) {
        setDbTeachers(data)
      }
    }).catch(() => {
      console.log('API 未连接，显示静态数据')
    })
  }, [location.pathname])

  const allTeachers = useMemo(() => dbTeachers, [dbTeachers])

  const allSubjects = useMemo(() => [...new Set(allTeachers.flatMap((t) => t.subjects))], [allTeachers])
  const allGrades = useMemo(() => [...new Set(allTeachers.flatMap((t) => t.grades))], [allTeachers])
  const allDistricts = useMemo(() => [...new Set(allTeachers.map((t) => t.district))], [allTeachers])

  const filtered = useMemo(() => {
    let result = [...allTeachers]
    if (subject) result = result.filter((t) => t.subjects.includes(subject))
    if (grade) result = result.filter((t) => t.grades.includes(grade))
    if (district) result = result.filter((t) => t.district === district)
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'students') result.sort((a, b) => b.students - a.students)
    return result
  }, [subject, grade, district, sortBy])

  const flyToTeacher = useCallback((teacher: Teacher) => {
    if (mapRef.current) {
      mapRef.current.flyTo([teacher.lat, teacher.lng], 14, { duration: 0.8 })
    }
  }, [])

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [28.175, 112.98],
      zoom: 13,
      zoomControl: false,
      minZoom: 11,
      maxBounds: L.latLngBounds([28.05, 112.85], [28.35, 113.15]),
      maxBoundsViscosity: 0.8,
    })

    L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
      subdomains: ['1', '2', '3', '4'],
      maxZoom: 18,
    }).addTo(map)

    mapRef.current = map
    map.whenReady(() => setMapReady(true))

    return () => {
      map.remove()
      mapRef.current = null
      setMapReady(false)
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) return

    const existingIds = new Set(markersRef.current.keys())
    const currentIds = new Set(filtered.map((t) => t.id))

    existingIds.forEach((id) => {
      if (!currentIds.has(id)) {
        const marker = markersRef.current.get(id)
        if (marker) { marker.remove(); markersRef.current.delete(id) }
      }
    })

    filtered.forEach((teacher, index) => {
      if (markersRef.current.has(teacher.id)) return
      const icon = createTeacherIcon(index + 1, false)
      const marker = L.marker([teacher.lat, teacher.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:-apple-system,PingFang SC,sans-serif;min-width:160px;font-size:12px;color:#555">
          <div style="font-size:14px;font-weight:600;color:#111;margin-bottom:2px">${teacher.name}</div>
          <div style="color:#999;margin-bottom:4px">${teacher.university} · ${teacher.year} · ${teacher.district}</div>
          <div style="margin-bottom:4px">${teacher.major} · ${teacher.experience}</div>
          <div style="margin-bottom:4px"><span style="font-weight:600">${teacher.rating}分</span> · ${teacher.students}学员</div>
          <div style="color:#e53935;font-weight:600">¥${teacher.price}/小时</div>
        </div>`)
      marker.on('click', () => setHighlightId(teacher.id))
      markersRef.current.set(teacher.id, marker)
    })
  }, [filtered, mapReady])

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const teacher = filtered.find((t) => t.id === id)
      if (!teacher) return
      const index = filtered.findIndex((t) => t.id === id)
      marker.setIcon(createTeacherIcon(index + 1, highlightId === teacher.id))
    })
    if (highlightId) {
      const card = cardRefs.current.get(highlightId)
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [highlightId, filtered])

  return (
    <div>
      <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', padding: '48px 0 36px' }}>
        <div className="container">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)' }}>长沙大学生老师库</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>{allTeachers.length} 位在校大学生，覆盖长沙各区</p>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>筛选</span>
          <select className="form-select" value={subject} onChange={(e) => setSubject(e.target.value)} style={{ minWidth: 90 }}>
            <option value="">学科</option>
            {allSubjects.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="form-select" value={grade} onChange={(e) => setGrade(e.target.value)} style={{ minWidth: 90 }}>
            <option value="">年级</option>
            {allGrades.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <select className="form-select" value={district} onChange={(e) => setDistrict(e.target.value)} style={{ minWidth: 90 }}>
            <option value="">区域</option>
            {allDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ minWidth: 110 }}>
            <option value="rating">评分</option>
            <option value="price-asc">价格↑</option>
            <option value="price-desc">价格↓</option>
            <option value="students">学员多</option>
          </select>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>共 {filtered.length} 位</span>
        </div>
      </section>

      <section style={{ background: 'var(--bg-subtle)', padding: '32px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }} className="teachers-layout">
            <div style={{ display: 'grid', gap: 12 }}>
              {filtered.map((teacher) => (
                <div
                  key={teacher.id}
                  ref={(el) => { if (el) cardRefs.current.set(teacher.id, el); else cardRefs.current.delete(teacher.id) }}
                  className="card"
                  onClick={() => { setHighlightId(teacher.id); flyToTeacher(teacher) }}
                  style={{
                    padding: 20,
                    cursor: 'pointer',
                    borderColor: highlightId === teacher.id ? 'var(--text)' : 'var(--border)',
                    borderWidth: highlightId === teacher.id ? '2px' : '1px',
                  }}
                >
                  <div className="teacher-card-inner" style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', flexShrink: 0,
                    }}>{teacher.initial}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text)' }}>{teacher.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          {teacher.university} · {teacher.year}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                        {teacher.subjects.map((s) => (
                          <span key={s} style={{ padding: '1px 7px', borderRadius: 2, fontSize: '0.78rem', background: '#111', color: '#fff' }}>{s}</span>
                        ))}
                        {teacher.grades.map((g) => (
                          <span key={g} style={{ padding: '1px 7px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{g}</span>
                        ))}
                        <span style={{ padding: '1px 7px', borderRadius: 2, fontSize: '0.78rem', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>{teacher.district}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 6 }}>{teacher.description}</p>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {teacher.tags.map((tag) => (
                          <span key={tag} style={{ padding: '1px 8px', borderRadius: 2, fontSize: '0.75rem', background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="teacher-card-price" style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text)' }}>¥{teacher.price}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>/小时</div>
                      <div style={{ marginTop: 6 }}>
                        <span style={{ color: '#f5a623', fontWeight: 600, fontSize: '0.85rem' }}>{teacher.rating}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>分</span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{teacher.students}位学员</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                    {teacher.videoUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setVideoTeacher(teacher) }}
                        style={{ padding: '5px 12px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer' }}
                      >自我介绍</button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); setHighlightId(teacher.id); flyToTeacher(teacher); setDetailTeacher(teacher) }}
                      style={{ padding: '5px 12px', borderRadius: 4, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer' }}
                    >了解更多</button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                  <p>没有找到匹配的老师</p>
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: 72 }}>
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>老师分布</span>
                  <span style={{ marginLeft: 8, fontSize: '0.78rem', color: 'var(--text-muted)' }}>点击卡片查看位置</span>
                </div>
                <div ref={mapContainerRef} style={{ width: '100%', height: 480 }} />
                <div style={{ padding: '8px 16px', display: 'flex', gap: 16, alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#555' }} /> 老师
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#111' }} /> 选中
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {videoTeacher && (
        <VideoModal teacherName={videoTeacher.name} videoUrl={videoTeacher.videoUrl} onClose={() => setVideoTeacher(null)} />
      )}
      {detailTeacher && (
        <TeacherDetailModal teacher={detailTeacher} onClose={() => setDetailTeacher(null)} />
      )}
    </div>
  )
}
