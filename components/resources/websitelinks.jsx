import { Modal } from "flowbite";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
// import DateRangePicker from 'flowbite-datepicker/DateRangePicker';
import {RiDeleteBin6Line} from "react-icons/ri"


import { format, set } from 'date-fns'

export default function WebsiteLink({roomDetails}) {
  console.log("Project Details from Taskboard Tab" + roomDetails[0]);

  const roomIdPut = roomDetails[0]?._id;
  

  const [websiteLinks, setWebsiteLinks] = useState(roomDetails[0]?.websiteLinks || []);

  // const sortedIdeas = ideas?.sort((a, b) => b.createdAt - a.createdAt);


  // showSuccess('Your flutter has been deleted')
  var [Title, setTitle] = useState();
  var [Description, setDescription] = useState();
  // var [Date, setDate] = useState();

  const titleUpdate = (event) => {
    setTitle(event.target.value);
  };
  const descriptionUpdate = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (e) => {
    // Once the form has been submitted, this function will post to the backend
    document.getElementById("NotepadForm").reset();
  const notes = websiteLinks; // Create a new array with the existing notes

  notes.push({ id: Date.now(), title: Title, description: Description });

  setWebsiteLinks(notes);
  console.log("Notes: " + websiteLinks);

  setShowModal(!showModal)

    const postURL = `/api/newroom?roomIdPut=${roomIdPut}`; //Our previously set up route in the backend
    await fetch(postURL, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        websiteLinks: websiteLinks,
      }),
    }).then(() => {
      toast("🥳 Note Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    });

    
  };

  const handleDeleteNote = async (noteId) => {
    // Perform the necessary operations to delete the note with the given noteId
    // For example, you can filter the notes array to exclude the note with the specified noteId
    const updatedNotes = websiteLinks.filter((note) => note.id !== noteId);
  
    setWebsiteLinks(updatedNotes);

    toast("Note Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const postURL = `/api/newroom?roomIdPut=${roomIdPut}`; //Our previously set up route in the backend
    await fetch(postURL, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        websiteLinks : updatedNotes,
      }),
    })
  
    // Perform any other actions you need to delete the note
  };
  
  const [showModal, setShowModal] = useState(false)

  const handleModalView = () => {
    setShowModal(!showModal)
    }
    

  return (
    <>
      <div className="bg-white p-4 min-h-screen rounded-xl">
          <div className="rounded">
            <p
              id="ideaModalButton" onClick={handleModalView}
              className="block pb-12 p-2 mb-4 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer focus:outline-none"
            >Add Website Links...</p>
          </div>
          <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 mt-5">
  {websiteLinks?.map((taskboard) => {
    // MMMM d, yyyy h:mm a
    const date = format(taskboard.id, "MMMM d, yyyy");
    return (
      <>
        <div key={taskboard.id} className="flex items-center justify-center">
          <div className="rounded border border-gray-300 p-3 shadow-md h-full w-full bg-white text-black">
            <div className="flex w-full items-center justify-between ">
              <a
                href={taskboard.description}
                target="_blank"
                rel="noopener"
                className="text-gray-800 flex hover:text-gray-600 hover:underline items-center space-x-3 "
              >
                <div className="flex flex-row md:text-lg text-sm overflow-x-auto">
                  <h1>{taskboard.title}</h1>
                </div>
              </a>
              <div className="flex items-center space-x-2 ">
                <div className="flex items-center justify-between text-gray-800 dark:text-gray-100 w-full">
                  <button
                    className=""
                    onClick={() => handleDeleteNote(taskboard.id)}
                  >
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  })}
</div>
            
            {
                showModal && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center bg-gray-700 bg-opacity-50 dark:bg-opacity-80">
                    <div
                        id="ideaModal"
                        tabIndex="-1"
                        className="z-20 w-full max-w-xl p-4 overflow-x-hidden overflow-y-auto bg-white rounded shadow-xl dark:bg-navbar border border-gray-700"
                    >
                        <div className="px-3 py-3 lg:px-4">
                        <div className="mb-4 flex justify-between">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Add website Links
                            </h3>
                            <button
                            type="button"
                            onClick={handleModalView}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                            data-modal-toggle="ideaModal"
                            >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form
                            id="NotepadForm"
                            method="PUT"
                            onSubmit={handleSubmit}
                            action=""
                            className="space-y-6"
                        >
                    <div>
                      <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        onChange={titleUpdate}
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="give a title"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Add URL
                      </label>
                      <input
                        onChange={descriptionUpdate}
                        type="url"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="add URL"
                        required
                      />
                    </div>
                    <div>
                      

                      <button
                        type="submit" data-modal-toggle="ideaModal"
                        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800"
                      >
                        Save Link
                      </button>
                    </div>
                  </form>
                </div></div>
              </div>

                )
                }

        </div>

    </>
  );
}
