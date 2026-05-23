import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import NeedPost from './pages/NeedPost'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="needs" element={<NeedPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
