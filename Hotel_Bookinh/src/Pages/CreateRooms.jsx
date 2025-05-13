import React, { useEffect,  useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../contex/AuthContex'
import { uploadImage } from '../lib/storage'
import { GiArchiveRegister } from "react-icons/gi";
import { Link, useNavigate, useParams } from 'react-router';
import { createRoom, getRoomyById, updateRoom } from '../Lib/room'

function CustomerRegister() {

  const { id } = useParams();
  // console.log("id from url", id)

  const isEditMode = Boolean(id)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') // Always initialize as an empty string
  const [selectedTypes, setSelectedTypes] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  // const [isTagsMenuOpen, setIsTagsMenuOpen] = useState(false)
  const [featuredImageUrl, setFeaturedImageUrl] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [error, setError] = useState(null)
  const [price, setPrice] = useState('')

  // State for image upload
  const [selectedImage, setSelectedImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePath, setImagePath] = useState('')
  const navigate = useNavigate()
  const { user } = useAuth()


  const fileInputRef = useRef(null)

  useEffect(() => {
    if (isEditMode) {
      const fetchRoom = async () => {
        try {
          const room = await getRoomyById(id);

          console.log("room info", room);

          if (!room) {
            setError("Room not found");
            return;
          }
          // check if teh user is the author
          if (room.author_id !== user?.id) {
            setError("You do not have permission to edit this room");
            return;
          }

          setTitle(room.title);
          setContent(room.content);
          setSelectedTypes(room.selectedTypes);
          setPrice(room.price);


          // Handle featured image loading with explicit error handling

          if (room.featured_image) {
            console.log(
              "Loading existing featured image:",
              room.featured_image
            );
            // Simply set the URL directly without the fetch check
            setFeaturedImageUrl(room.featured_image);
          } else {
            setFeaturedImageUrl("");
          }

          // setImagePath(ar)

          setIsPublished(room.published || false);
        } catch (error) {
          console.error("Error fetching room:", error);
          setError("Failed to load room");
        }
      };

      fetchRoom();
    }
  }, [id, isEditMode, user.id]);

  

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

const handleSave = async (publishStatus = null) => {
  // Validate inputs
  if (!title.trim()) {
    toast.error('Please add a title to your room')
    return
}
  if (!price.trim()) {
    toast.error('Please add a title to your room')
    return
}


// Check for content
if (!content || content === '<p><br></p>'){
    toast.error('Please add some content to your room')
    return
}



// If user is not logged in, redirect to sign in
if (!user) {
    toast.error('You must be signed in to save an room')
    navigate('/signin')
    return
}

let uploadedImageData = null

setIsSaving(true);

console.log('Starting room save with state:', {
    isEditMode,
    featuredImageUrl,
    imagePath,
    selectedImage,
    uploadedImageData
})


try {


    // Determine if we should update the publish status
    const published = publishStatus !== null ? publishStatus : isPublished

    // Get the current image state, preferring newly uploaded image if available
    const currentImageUrl = uploadedImageData?.url || featuredImageUrl
    const currentImagePath = uploadedImageData?.path || imagePath


    console.log('Current image state:', {
        featuredImageUrl: currentImageUrl,
        imagePath: currentImagePath,
        selectedImage,
        uploadedImageData
    })

    // featured_image

    const roomData = {
        title,
        price,
        content,
        selectedTypes,
        authorId: user.id,
        published,
        featuredImageUrl: currentImageUrl
    }

    console.log('Saving Room with data:', roomData);

    let savedRoom;


    // update 

    if (isEditMode) {
        // update functions
        savedRoom = await updateRoom(id, roomData)
    } else {
        // insert || create new Room
        savedRoom = await createRoom(roomData)
    }


    console.log('Room saved successfully:', savedRoom)

    toast.success(`Room ${isEditMode ? 'updated' : 'created'} successfully!`)

} catch (error) {
    console.error('Error saving Room:', error)
    toast.error('Failed to save your Room. Please try again later.')
} finally {
    setIsSaving(false)
}

}


const handleChangeSelectTypes = (e) => {
  setSelectedTypes(e.target.value);
  console.log('Room type selected:', e.target.value);
};




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
          <Link to={"/manage"} class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
            Manage Rooms
          </Link>
        </div>
        <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
              value={selectedTypes}
              onChange={handleChangeSelectTypes}
            >
              <option value="">Room Type</option>
              <option value="One Person">1 Person</option>
              <option  value="Two Person">2 Person</option>
              <option  value="Couple">Couple</option>
              <option  value="Family">Family</option>
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
          <div className='grid col-span-2'>
            <label class="block text-gray-700">Content:</label>
            <textarea
              
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              
              class="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter Content"
            />
          </div>
        </div>
        <div class="flex items-center gap-4 p-4">
          <button 
          onClick={()=>handleSave(true)}
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
