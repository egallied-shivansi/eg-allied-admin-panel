import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CareerForm from './components/pages/CareerForm'
import PartnerForm from './components/pages/PartnerForm'
import ContactForm from './components/pages/ContactForm'
import CreateBlog from './components/pages/CreateBlog'
import DashboardLayout from './components/layouts/DashboardLayout'
import BlogListing from './components/pages/BlogListing'
import EditBlog from './components/pages/EditBlog'
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="career-form" replace />} />
          <Route path="career-form" element={<CareerForm />} />
          <Route path="partner-form" element={<PartnerForm />} />
          <Route path="contact-form" element={<ContactForm />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="blogs" element={<BlogListing />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
