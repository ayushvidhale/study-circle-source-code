import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase-config';
import {FaEye} from "react-icons/fa"
import {RiDeleteBin6Line} from "react-icons/ri"
import {AiOutlineUpload} from "react-icons/ai"

const GalleryPage = ({resourceId}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleUploadImages = () => {
    selectedImages.forEach((image) => {
      const imageRef = ref(storage, `SharedResources/IMAGES/${resourceId}/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [image.name]: progress,
          }));
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUploadedImages((prevImages) => [...prevImages, { name: image.name, url }]);
          });
        }
      );
    });
    setSelectedImages([]);
  };

  const handleDeleteImage = async (imageName) => {
    try {
      const imageRef = ref(storage, `SharedResources/IMAGES/${resourceId}/${imageName}`);
      await deleteObject(imageRef);
      setUploadedImages((prevImages) => prevImages.filter((image) => image.name !== imageName));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const folderRef = ref(storage, `SharedResources/IMAGES/${resourceId}`);
        const files = await listAll(folderRef);
  
        const imagePromises = files.items.map(async (file) => {
          const url = await getDownloadURL(file);
          return { name: file.name, url };
        });
  
        const images = await Promise.all(imagePromises);
        setUploadedImages(images);
      } catch (error) {
        console.error('Error fetching uploaded images:', error);
      }
    };
    fetchUploadedImages();
  }, [resourceId]);

  

  return (
    <div className="container mx-auto bg-white p-4 min-h-screen rounded-xl">
      <div className="flex w-full justify-end place-content-end place-items-end mb-4  ">
      {selectedImages.map((image) => (
          <div key={image.name} className="flex items-center">
            <span className="mr-2">{image.name}</span>
            {/* {uploadProgress[image.name] !== undefined && (
              <progress value={uploadProgress[image.name]} max={100} className="w-64"></progress>
            )} */}
          </div>
        ))}
        <div className='flex bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
        <label htmlFor="fileInput" className="mr-2 flex py-2" >
        <AiOutlineUpload className='text-xl mx-2' />Upload
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
        />
        <button
          className="px-4 flex h-full bg-green-500 py-2 rounded-r-lg text-white hover:bg-green-600"
          onClick={handleUploadImages}
        >
          Add
        </button>
          
          </div>
      </div>

      <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-4">
        {uploadedImages.map((image) => (
          <div key={image.name} className="p-2 border rounded bg-gray-100">
            <img src={image.url} alt={image.name} className="w-full h-48 object-cover" />
            <div className="flex justify-between mt-2">
              <a href={image.url} rel="noopener" target='_blank' download={image.name} className="">
                <FaEye className="text-xl ml-4" />
              </a>
              <button
                className=""
                onClick={() => handleDeleteImage(image.name)}
              >
                <RiDeleteBin6Line className="text-xl mr-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-4">
        {selectedImages.map((image) => (
          <div key={image.name} className="flex items-center">
            <span className="mr-2">{image.name}</span>
            {uploadProgress[image.name] !== undefined && (
              <progress value={uploadProgress[image.name]} max={100} className="w-64"></progress>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default GalleryPage;
