import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import NeedPost from './pages/NeedPost'
import TeacherLogin from './pages/TeacherLogin'
import TeacherRegister from './pages/TeacherRegister'
import TeacherProfile from './pages/TeacherProfile'
import AdminNeeds from './pages/AdminNeeds'
import TeacherDashboard from './pages/TeacherDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="needs" element={<NeedPost />} />
          <Route path="teacher/login" element={<TeacherLogin />} />
          <Route path="teacher/register" element={<TeacherRegister />} />
          <Route path="teacher/profile" element={<TeacherProfile />} />
          <Route path="teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="admin/needs" element={<AdminNeeds />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
