import { NavLink, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    const navLinks = [
      { path: 'career-form', name: 'Career Form' },
      { path: 'partner-form', name: 'Partner Form' },
      { path: 'contact-form', name: 'Contact Form' },
      { path: 'blogs', name: 'Blogs' },
    ]

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