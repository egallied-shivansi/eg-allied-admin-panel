import { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import BlogCard from '../common/BlogCard'
import { Link } from 'react-router-dom'

const BlogListing = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(
          collection(db, 'blogs'),
          orderBy('createdAt', 'desc')
        )
        const querySnapshot = await getDocs(blogsQuery)
        const blogsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setBlogs(blogsData)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="">
      {/* Header with Create Blog button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <Link
          to="/admin/dashboard/create-blog"
          className="px-4 py-2 text-sm bg-blue-400 text-white hover:text-white rounded-md hover:bg-blue-300 transition-colors"
        >
          Create New Blog
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            thumbnailUrl={blog.thumbnailUrl}
            content={blog.content}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogListing
