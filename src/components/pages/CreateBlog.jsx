import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const CreateBlog = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const fileInputRef = useRef(null)
  const { currentUser } = useAuth()

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      const imageUrl = URL.createObjectURL(file)
      setThumbnailPreview(imageUrl)
    }
  }

  const handleEditorChange = (content) => {
    setContent(content)
  }

  const handleSave = async () => {
    try {
      const thumbnailBlobUrl = URL.createObjectURL(thumbnail)

      const blogData = {
        title,
        content,
        thumbnailUrl: thumbnailBlobUrl,
        createdAt: new Date(),
        authorId: currentUser.uid,
        authorEmail: currentUser.email
      }

      await addDoc(collection(db, 'blogs'), blogData)
      alert('Blog saved successfully!')
      navigate('/admin/dashboard/blogs')  // Navigate back to listing page
      
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Error saving blog. Please try again.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Input */}
      <div>
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Thumbnail Section */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
        >
          Upload Thumbnail
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleThumbnailChange}
          accept="image/*"
          className="hidden"
        />
        {thumbnailPreview && (
          <div className="w-12 h-12 overflow-hidden rounded-full border">
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* TinyMCE Editor */}
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY} 
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | ' +
            'blocks | ' +  // This adds the heading dropdown
            'bold italic underline forecolor | alignleft aligncenter ' +
            'alignright | bullist numlist outdent indent | ' +
            'removeformat | image ',
          block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          file_picker_types: 'image',
          file_picker_callback: function(callback, value, meta) {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function() {
                const file = this.files[0];
                const reader = new FileReader();
                reader.onload = function() {
                  const blobUrl = URL.createObjectURL(file);
                  callback(blobUrl, { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            }
          },
          images_upload_handler: function(blobInfo, progress) {
            return new Promise((resolve, reject) => {
              const blobUrl = URL.createObjectURL(blobInfo.blob());
              resolve(blobUrl);
            });
          }
        }}
        onEditorChange={handleEditorChange}
      />

      {/* Optional: Add a submit button */}
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Blog
      </button>
    </div>
  )
}

export default CreateBlog
