import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineUpload } from "react-icons/ai";

const PDFGalleryPage = ({ resourceId }) => {
  const [selectedPDFs, setSelectedPDFs] = useState([]);
  const [uploadedPDFs, setUploadedPDFs] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedPDFs([...selectedPDFs, ...files]);
  };

  const handleUploadPDFs = () => {
    selectedPDFs.forEach((pdf) => {
      const pdfRef = ref(storage, `SharedResources/PDF/${resourceId}/${pdf.name}`);
      const uploadTask = uploadBytesResumable(pdfRef, pdf);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [pdf.name]: progress,
          }));
        },
        (error) => {
          console.error('Error uploading PDF:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUploadedPDFs((prevPDFs) => [...prevPDFs, { name: pdf.name, url }]);
          });
        }
      );
    });
    setSelectedPDFs([]);
  };

  const handleDeletePDF = async (pdfName) => {
    try {
      const pdfRef = ref(storage, `SharedResources/PDF/${resourceId}/${pdfName}`);
      await deleteObject(pdfRef);
      setUploadedPDFs((prevPDFs) => prevPDFs.filter((pdf) => pdf.name !== pdfName));
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  useEffect(() => {
    const fetchUploadedPDFs = async () => {
      try {
        const folderRef = ref(storage, `SharedResources/PDF/${resourceId}`);
        const files = await listAll(folderRef);

        const pdfPromises = files.items.map(async (file) => {
          const url = await getDownloadURL(file);
          return { name: file.name, url };
        });

        const pdfs = await Promise.all(pdfPromises);
        setUploadedPDFs(pdfs);
      } catch (error) {
        console.error('Error fetching uploaded PDFs:', error);
      }
    };
    fetchUploadedPDFs();
  }, [resourceId]);

  return (
    <div className="container mx-auto bg-white p-4 min-h-screen rounded-xl">
      <div className="flex w-full justify-end place-content-end place-items-end mb-4">
        {selectedPDFs.map((pdf) => (
          <div key={pdf.name} className="flex items-center">
            <span className="mr-2">{pdf.name}</span>
            {uploadProgress.hasOwnProperty(pdf.name) && (
              <progress value={uploadProgress[pdf.name]} max={100} className="w-48"></progress>
            )}
          </div>
        ))}
        <div className='flex bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
          <label htmlFor="pdfInput" className="mr-2 flex py-2" >
            <AiOutlineUpload className='text-xl mx-2' />Upload
          </label>
          <input
            type="file"
            id="pdfInput"
            className="hidden"
            multiple
            accept="application/pdf"
            onChange={handleFileInputChange}
          />
          <button
            className="px-4 flex h-full bg-green-500 py-2 rounded-r-lg text-white hover:bg-green-600"
            onClick={handleUploadPDFs}
          >
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {uploadedPDFs.map((pdf) => (
          <div key={pdf.name} className="p-2 border rounded bg-gray-100">
            <iframe src={pdf.url} title={pdf.name} className="w-full h-auto"></iframe>
            <div className="flex justify-between mt-2">
              <a href={pdf.url} download={pdf.name} className="">
                <FaEye className='text-xl ml-4' />
              </a>
              <button
                className=""
                onClick={() => handleDeletePDF(pdf.name)}
              >
                <RiDeleteBin6Line className="text-xl mr-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFGalleryPage;
