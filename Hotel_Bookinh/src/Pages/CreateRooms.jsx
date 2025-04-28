import React, { useEffect,  useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../contex/AuthContex'
import { uploadImage } from '../lib/storage'
import { GiArchiveRegister } from "react-icons/gi";
import { useNavigate } from 'react-router';
// import { createRoom, getArticleById, updateRoom } from '../Lib/room'

function CustomerRegister() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') // Always initialize as an empty string
  const [selectedTags, setSelectedTags] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false)
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [error, setError] = useState(null)

  // State for image upload
  const [selectedImage, setSelectedImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePath, setImagePath] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()


  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {

    const file = e.target.files[0];

    if (file) {
        // check the file type

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file')

            e.target.value = "";
            setSelectedImage(null)
            return
        }


        // check file size ( limit to 2MB)

        const maxSize = 2 * 1024 * 1024

        if (file.size > maxSize) {
            toast.error(`Image size ( ${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the 2MB limit`);
            e.target.value = "";
            setSelectedImage(null)
            return
        }

        setSelectedImage(file);

        toast.success(`Select file : ${file.name}`)
    }
}

const handleUploadImage = async () => {

  if (!selectedImage) {
      toast.error("Please select an image")
      return
  }

  // check if the user is logged in

  if (!user) {
      toast.error('You must be signed in to upload images')
      navigate('/signin')
      return
  }

  // start uploading

  setIsUploading(true);

  console.log('Starting image upload for:', selectedImage);

  try {

      // upload image to supabase storage

      const { path, url } = await uploadImage(selectedImage, user.id);

      console.log("Image uploaded successfully", { path, url });

      setFeaturedImageUrl(url);
      setImagePath(path)

      // clear selected image and file input
      setSelectedImage(null);
      if (fileInputRef.current) {
          fileInputRef.current.value = ""
      }

      toast.success('Image uploaded successfully')
      console.log('Image state after upload:', {
          featuredImageUrl: url,
          imagePath: path
      })

      // Return the uploaded image data
      return { url, path }

  } catch (error) {
      console.error('Error uploading image:', error)
      toast.error(`Failed to upload image: ${error.message || 'Unknown error'}`)
      throw error

  } finally {
      setIsUploading(false)
  }
}







  return (
    <div className="max-w-screen flex flex-col bg-gray-100">
      <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">
        Create Room Blogs
      </div>

      <div class="bg-white m-5 rounded-lg shadow-md">
        <div class="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
          <h2 class="text-xl font-semibold flex items-center gap-2 text-white">
            <GiArchiveRegister /> Create Room Blogs
          </h2>
          <button class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
            Customer
          </button>
        </div>
        <div class="p-4 grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label class="block text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              class="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Title"
            />
          </div>

          <div>
            <label class="block text-gray-700">Price:</label>
            <input
              type="text"
              id="title"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              class="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Price"
            />
          </div>

          <div>
            <label class="block text-gray-700">Room Type:</label>
            <select
              class="w-full mt-1 p-2 border rounded-md"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Room Type</option>
            </select>
          </div>

          <div className="">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div>
                  <label class="block text-gray-700">Feature Image:</label>
                  <input
                    type="file"
                    id="featured-image"
                    accept="image/*"
                    onChange={handleImageSelect}
                    ref={fileInputRef}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                </div>
                {/* when we choose image */}

                {selectedImage && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await handleUploadImage();
                      } catch (error) {
                        console.error("Failed to upload image:", error);
                        toast.error(
                          "Failed to upload image. Please try again."
                        );
                      }
                    }}
                    disabled={isUploading}
                    className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 disabled:opacity-50 cursor-pointer"
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <label class="block text-gray-700">Content:</label>
            <textarea
              type="text"
              name=""
              id=""
              class="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Content"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 p-4">
          <button 
          onClick={()=>handleSave(false)}
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            {isEditMode ? "Update and Publish" : "Save and Publish"}
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
