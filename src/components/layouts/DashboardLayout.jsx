import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const DashboardLayout = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const navLinks = [
      { path: 'career-form', name: 'Career Form' },
      { path: 'partner-form', name: 'Partner Form' },
      { path: 'contact-form', name: 'Contact Form' },
      { path: 'blogs', name: 'Blogs' },
      { path: 'create-admin', name: 'Create Admin' },
    ]

    const handleLogout = async () => {
      try {
        await logout()
        navigate('/login')
      } catch (error) {
        console.error('Failed to logout:', error)
      }
    }

  return (
    <div className="flex h-full p-2 gap-4">
      {/* Sidebar */}
      <div className="w-60 h-full bg-white border rounded-xl p-4">
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 text-sm text-gray-600 hover:text-black py-2 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-100 '
                    : ' hover:bg-blue-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className="block w-full px-4 text-sm text-gray-600 hover:text-black py-2 rounded-xl transition-colors hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
        <div className="h-full w-full flex-1 bg-white p-4 border rounded-xl  ">
          <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout