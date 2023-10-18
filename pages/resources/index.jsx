import { useSession } from "next-auth/react";

import Link from "next/link";
import { useEffect, useState } from "react";
import {LuArrowRight} from "react-icons/lu"
import {IoEarth}  from "react-icons/io5"


export default function Resources(){

    const {data: session} = useSession();
    //console.log(session);


    // Initialize a state to store the fetched data
  const [currentUserRooms, setCurrentUserRooms] = useState([]);

  // Fetch data from MongoDB using useEffect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/newroom?userId=${session?.user?.id}`
        );
        const jsonData = await response.json();
        setCurrentUserRooms(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [session?.user?.id]);



    return (
      <div className="pb-6 pt-2 md:ml-[79px] ml-0 md:pl-0 pl-2 pr-2 h-screen bg-white  overflow-auto">
        <div className="w-full rounded-2xl min-h-[97%] pb-20 text-gray-700 bg-purple-100 ">

<div className="px-10 mt-4 pt-2">
        <div className="flex items-center flex-shrink-0 h-10">
          <span className="block text-xl font-bold">Shared Resources</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {currentUserRooms.length || 0}
          </span>
          <Link href="/explore" className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 pb-2 overflow-auto">


          {currentUserRooms.length > 0 ? currentUserRooms.map((room) => ( 

          <Link href={`/resources/${room?.name}`} key={room?._id}
            className="relative flex flex-col items-start p-4 py-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100"
          >
            <button className="absolute cursor-default top-4 right-4 items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 hover:text-gray-700 flex">
            <IoEarth  className="text-2xl"/>
            </button>
            <span className="text-lg font-bold mt-2 ">
              {room?.name}
            </span>
            <h4 className="mt-1 text-sm font-medium mb-2">
              {room?.goal}
            </h4>
            <div className="flex justify-between items-center mb-2 w-full mt-3 text-xs font-medium text-gray-400 pt-6">
            <div className="flex">
            {room?.members?.map((member) => (
                <img key={member?._id}
                className="w-8 h-8 ml-auto bg-gray-300 mr-1 rounded-full"
                src={`https://robohash.org/${member?.id}`}
              />
              )) 
              }
              </div>
              <div className="flex items-center ">
                <span className="ml-1 leading-none"><LuArrowRight  className="text-2xl"/></span>
              </div>
              
              
            </div>
          </Link>

          )): <div className="relative flex flex-col items-start p-4 py-8 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100"
        >
          {/* <button className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button> */}
          <span className="text-lg font-bold mt-2 ">
            No Rooms Found
          </span>
          <h4 className="mt-1 text-sm font-medium mb-2">
            Create a room to get started
          </h4>
          <div className="flex justify-between items-center mb-2 w-full mt-3 text-xs font-medium text-gray-400">
          
            
          </div>
        </div>}


          
        </div>

      </div>
      <div className="px-10 mt-4">


        <br />
        <span className="block text-xl mb-2 font-bold">Personal Resources</span>
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 pb-2 overflow-auto">

          <Link href={`/resources/private`}
            className="relative flex flex-col items-start p-4 py-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100"
          >
            <span className="text-lg font-bold mt-2 ">
              {session?.user?.name}
            </span>
            <h4 className="mt-1 text-sm font-medium mb-2">
              {session?.user?.major}
            </h4>
            <div className="flex justify-between items-center mb-2 w-full mt-3 text-xs font-medium text-gray-400 pt-6">
            <div className="flex">
              <img
                className="w-8 h-8 ml-auto bg-gray-300 rounded-full"
                src={`https://robohash.org/${session?.user?.id}`}
              />
              {/* <img
                className="w-8 h-8 ml-auto rounded-full"
                src="https://randomuser.me/api/portraits/women/26.jpg"
              /> */}
              </div>
              <div className="flex items-center ">
              <span className="ml-1 leading-none"><LuArrowRight  className="text-2xl"/></span>

              </div>
              
              
            </div>
          </Link>



          
        </div>
      </div>
        
        </div>
        </div>
    )
}