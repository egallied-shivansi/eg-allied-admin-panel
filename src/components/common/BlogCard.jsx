import { useNavigate } from 'react-router-dom'

const BlogCard = ({ id, title, thumbnailUrl, content }) => {
    const navigate = useNavigate()
  return (
    <div 
    onClick={() => navigate(`/admin/dashboard/edit-blog/${id}`)}
    className="border rounded-lg p-1 bg-white  overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48  overflow-hidden rounded-lg">
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
  )
}

export default BlogCard 