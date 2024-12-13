import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
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
      <AuthProvider>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirect to login  */}
          <Route 
            path="/" 
            element={<Navigate to="/admin/dashboard" replace />} 
          />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="career-form" replace />} />
            <Route path="career-form" element={<CareerForm />} />
            <Route path="partner-form" element={<PartnerForm />} />
            <Route path="contact-form" element={<ContactForm />} />
            <Route path="blogs" element={<BlogListing />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
            <Route path="create-admin" element={<SignUp />} />
          </Route>

          {/* redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
