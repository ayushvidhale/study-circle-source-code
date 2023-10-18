import { useRouter } from 'next/router';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {MdOutlineSpaceDashboard} from "react-icons/md"
import {BiSearchAlt } from "react-icons/bi"
import {BiHomeHeart} from "react-icons/bi"
import {BiWalk} from "react-icons/bi"
import {BiBookAlt} from "react-icons/bi"
import React, { useState, useEffect } from 'react';

export default function Sidebar() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/join" });

    push(data.url);
  };


  const { push, asPath } = useRouter();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(asPath);
  }, [asPath]);

  
  const [timeData, setTimeData] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [userId, setUserId] = useState('');
  
  useEffect(() => {
    setUserProfile(session?.user?.email.split("@")[0]);
    setUserId(session?.user?.id);
    setTimeData(session?.user?.streaks || []); // Set initial timeData to an empty array if it's undefined
  }, [session]);
  
  useEffect(() => {
    async function updateData() {
      const currentDate = new Date();
      let updatedData = [...timeData]; // Create a copy of timeData
      
      const todayIndex = updatedData.findIndex(item => item.date === currentDate.toDateString());
      
      if (todayIndex !== -1) {
        // Update the time for today's date
        updatedData[todayIndex] = {
          date: currentDate.toDateString(),
          time: updatedData[todayIndex].time + 1,
        };
      } else {
        // Add a new element for today's date
        updatedData.push({
          date: currentDate.toDateString(),
          time: 1,
        });
      }
      
  
      const postURL = `/api/updateuser?userId=${userId}`;
      await fetch(postURL, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          streaks: updatedData,
        }),
      });
  
      setTimeData(updatedData);
      console.log(updatedData);
      console.log('Time data updated');
    }
  
    const updateTimer = setInterval(updateData, 1 * 60 * 1000);
  
    return () => clearInterval(updateTimer);
  }, [timeData, userId, session?.user]);
  
  


  const [isModalOpen, setIsModalOpen] = useState(false);

  const  handleLogOutForm = () => {
    setIsModalOpen(!isModalOpen);
  }

  if(activeLink.includes('join')|| activeLink === '/about'){
    return (
      <></>
    )
  } 

  return (
    <>
        <div className="fixed md:flex hidden z-50 h-screen w-fit bg-gray-200">
          <aside className="flex flex-col items-center bg-white text-gray-700 h-full pl-1">
            <div className="h-14 flex items-center w-full  rounded-xl">
              <Link className="h-12 w-12 mx-auto" href="/">
                <img
                  className="h-12 w-12 mx-auto"
                  src="../logo.png"
                  alt="svelte logo"
                />
              </Link>
            </div>

            <ul className="">
              <li className={`${activeLink === '/' || activeLink.includes('/room') ? 'bg-indigo-300 ' : ''} hover:bg-indigo-300 rounded-l-2xl rounded-r-none mb-2`}>
                <Link
                  href="/"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <MdOutlineSpaceDashboard className="text-xl"/>

                  <p className="text-xs font-semibold">Dashboard</p>
                </Link>
              </li>

              <li className={`${activeLink.includes('resources') ? 'bg-purple-300 ' : ''} hover:bg-purple-300 rounded-l-2xl rounded-r-none mb-2`}>
                <Link
                  href="/resources"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <BiBookAlt className="text-xl"/>
                  <p className="text-xs font-semibold">Resources</p>
                </Link>
              </li>

              <li className={`${activeLink.includes('explore') ? 'bg-emerald-300 ' : ''} hover:bg-emerald-300 rounded-l-2xl rounded-r-none mb-2`}>
                <Link
                  href="/explore"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <BiSearchAlt className="text-xl"/>
                  <p className="text-xs font-semibold">FindAlly</p>
                </Link>
              </li>

              <li className={`${activeLink === '/study' ? 'bg-yellow-300 ' : ''} hover:bg-yellow-300 rounded-l-2xl rounded-r-none mb-2`}>
                <Link
                  href="/study"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <BiHomeHeart className="text-xl"/>
                  <p className="text-xs font-semibold">Self Study</p>
                </Link>
              </li>

              {/* <li className="hover:bg-blue-400 rounded-xl">
                   <Link
                     href="."
                     className="h-14 px-2 flex justify-center items-center w-full
                     focus:text-orange-500">
                     <svg
                       className="h-5 w-5"
                       xmlns="http://www.w3.org/2000/svg"
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       stroke-width="2"
                       stroke-linecap="round"
                       stroke-linejoin="round">
                       <circle cx="12" cy="12" r="3"></circle>
                       <path
                         d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
                         0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
                         0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
                         2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
                         0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
                         0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
                         0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
                         0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
                         1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
                         1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
                         0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
                         1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
                         2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
                         0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
                         1.65 0 0 0-1.51 1z"></path>
                     </svg>
                     
                   </Link>

                 </li> */}

              {/* <li className="hover:bg-blue-400 rounded-xl">
                   <Link
                     href="."
                     className="h-14 px-2 flex justify-center items-center w-full
                     focus:text-orange-500">
                     <svg
                       className="h-5 w-5"
                       xmlns="http://www.w3.org/2000/svg"
                       width="24"
                       height="24"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       stroke-width="2"
                       stroke-linecap="round"
                       stroke-linejoin="round">
                       <path
                         d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                       <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                     </svg>
                   </Link>
                 </li> */}
            </ul>

            <div className="mt-auto h-32 flex flex-col items-center w-full">
              <div className={`${activeLink.includes(userProfile) ? 'bg-red-300 ' : ''} hover:bg-red-300 rounded-l-2xl w-full rounded-r-none mb-2`}>
                <Link
                  href={`/${userProfile}`}
                  className="h-14 px-2 flex flex-col justify-center items-center 
                     focus:text-gray-700"
                >
                  <img
                    src={`https://robohash.org/${userId}`}
                    className="rounded-full w-9 h-9 bg-gray-300"
                    alt=""
                  />
                  <p className="text-xs font-semibold">Profile</p>
                </Link>
              </div>
              <div className="hover:bg-gray-200 rounded-l-2xl w-full">
                <button
                  onClick={handleLogOutForm}
                  className="h-14 px-2 flex flex-col mx-auto justify-center items-center 
                     focus:text-gray-700"
                >
                  <BiWalk className="text-xl" />
                  <p className="text-xs font-semibold">Logout</p>
                </button>
              </div>
            </div>
          </aside>
        </div>
            <ul className="fixed bottom-0 md:hidden grid w-full grid-cols-6  bg-white items-center p-1  text-gray-700 z-50 ">
              <li className={`${activeLink === '/' || activeLink.includes('/room') ? 'bg-indigo-300 ' : ''} hover:bg-indigo-300 mr-1 rounded-xl`}>
                <Link
                  href="/"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <MdOutlineSpaceDashboard className="text-xl"/>

                  <p className="text-xs font-semibold">Dashboard</p>
                </Link>
              </li>

              <li className={`${activeLink.includes('resources') ? 'bg-purple-300 ' : ''} hover:bg-purple-300 rounded-xl mr-1`}>
                <Link
                  href="/resources"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <BiBookAlt className="text-xl"/>
                  <p className="text-xs font-semibold">Resources</p>
                </Link>
              </li>

              <li className={`${activeLink.includes('explore') ? 'bg-emerald-300 ' : ''} hover:bg-emerald-300 rounded-xl mr-1`}>
                <Link
                  href="/explore"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <BiSearchAlt className="text-xl"/>
                  <p className="text-xs font-semibold">FindAlly</p>
                </Link>
              </li>

              <li className={`${activeLink === '/study' ? 'bg-yellow-300 ' : ''} hover:bg-yellow-300 rounded-xl mr-1`}>
                <Link
                  href="/study"
                  className="h-14 px-2 flex flex-col justify-center items-center w-full
                     focus:text-gray-700"
                >
                  <BiHomeHeart className="text-xl"/>
                  <p className="text-xs font-semibold">Self Study</p>
                </Link>
              </li>
              <li className={`${activeLink.includes(userProfile) ? 'bg-red-300 ' : ''} hover:bg-red-300 rounded-xl w-full mr-1`}>
                <Link
                  href={`/${userProfile}`}
                  className="h-14 px-2 flex flex-col justify-center items-center 
                     focus:text-gray-700"
                >
                  <img
                    src={`https://robohash.org/${userId}`}
                    className="rounded-full md:w-9 md:h-9 h-8 w-8 bg-gray-300"
                    alt=""
                  />
                  <p className="text-xs font-semibold">Profile</p>
                </Link>
              </li>
              <li className="hover:bg-gray-200 rounded-xl w-full">
                <button
                  onClick={handleLogOutForm}
                  href="/join"
                  className="h-14 px-2 flex flex-col mx-auto justify-center items-center 
                     focus:text-gray-700"
                >
                  <BiWalk className="text-xl" />
                  <p className="text-xs font-semibold">Logout</p>
                </button>
              </li>
            </ul>

            {
              isModalOpen && (
                <div className="bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-20 backdrop-blur-sm bg-black/30 grid place-content-center justify-center w-screen h-screen ">
                <div
                  id="popup-modal"
                  tabindex="-1"
                  className="z-20 w-screen h-[calc(100%-1rem)] grid justify-center mb-4 p-4 overflow-x-hidden overflow-y-auto"
                >
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={handleLogOutForm} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You wish to log out?</h3>
                            <Link
                            onClick={handleSignOut}
                            href="/join"  data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-xl border-2 border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10  mr-2">
                                Yes, Until next time! 😉
                            </Link>
                            <button onClick={handleLogOutForm} data-modal-hide="popup-modal" type="button" className=" bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-xl border border-gray-200 text-sm font-medium px-5 py-2.5 text-gray-900 focus:z-10 ">No, I&apos;ll stay 😬</button>
                        </div>
                    </div>
                </div>
            </div></div>
              )
            }

    </>
  );
}