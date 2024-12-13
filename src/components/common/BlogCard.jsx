import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'

const BlogCard = ({ id, title, thumbnailUrl, content, onDelete }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    navigate(`/admin/dashboard/edit-blog/${id}`)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation() // Stop event from bubbling up
    setShowModal(true)
  }

  const handleConfirmDelete = () => {
    onDelete(id)
    setShowModal(false)
  }

  return (
    <>
      <div 
        onClick={handleClick}
        className="relative border rounded-lg p-1 bg-white overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow group"
      >
        {/* Delete Button */}
        <button 
          className="delete-button absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
          onClick={handleDeleteClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="h-48 overflow-hidden rounded-lg">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2 py-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div 
            className="text-gray-600 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: content.substring(0, 150) + '...' 
            }}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${title}"?`}
      />
    </>
  )
}

export default BlogCard 