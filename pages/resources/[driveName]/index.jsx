import clientPromise from "@/database/connectDB";
import React from 'react';
import {useSession} from 'next-auth/react';
// import useSWR from "swr";
import { Tabs } from "flowbite";
import { Key } from "react";
import { useRouter } from 'next/router';

import { FcTemplate } from "react-icons/fc";
import { GiTrophy } from "react-icons/gi";
import { FcParallelTasks } from "react-icons/fc";
import { FcWorkflow } from "react-icons/fc";
import { useEffect, useState } from "react";
import Link from "next/link";

import Youtube from '../../../components/resources/youtube';
import GalleryPage from '../../../components/resources/screenshot';
import Other from '../../../components/resources/other';
import PDFGalleryPage from '../../../components/resources/pdf';
import HandWritten from '../../../components/resources/handwritten';
import WebsiteLink from '../../../components/resources/websitelinks';
import {BiArrowBack} from "react-icons/bi";


import {BsLink} from "react-icons/bs"
import {GoPencil} from "react-icons/go"
import {SlSocialYoutube} from "react-icons/sl"
import {BsFiletypePdf} from "react-icons/bs"
import {MdPhotoSizeSelectActual} from "react-icons/md"
import {BsFolder} from "react-icons/bs"




export default function RoomResources({roomDetails}){

    const {data: session} = useSession();

    const [roomId, setRoomId] = useState('');
    const [roomDetails2, setRoomDetails2] = useState('');

    useEffect(() => {
      // if (!roomDetails[0]) return;
      setRoomId(roomDetails[0]?.id);
      setRoomDetails2(roomDetails);
      //console.log(roomDetails[0]?.id + " is the room id");
  }, [roomDetails]);


    
  useEffect(() => {
    const tabElements = [
      {
        id: "clubs",
        triggerEl: document.querySelector("#clubs-tab"),
        targetEl: document.querySelector("#clubs"),
      },
      {
          id: 'dashboard',
          triggerEl: document.querySelector('#dashboard-tab'),
          targetEl: document.querySelector('#dashboard')
      },
      {
        id: "repositories",
        triggerEl: document.querySelector("#repositories-tab"),
        targetEl: document.querySelector("#repositories"),
      },
      {
          id: 'contacts',
          triggerEl: document.querySelector('#contacts-tab'),
          targetEl: document.querySelector('#contacts')
      },
      {
        id: 'screenshot',
        triggerEl: document.querySelector('#screenshot-tab'),
        targetEl: document.querySelector('#screenshot')
    },
    {
        id: 'other',
        triggerEl: document.querySelector('#other-tab'),
        targetEl: document.querySelector('#other')
    }
    ];

    // options with default values
    const options = {
      defaultTabId: "repositories",
      activeClasses:
        "bg-gray-800 text-gray-100 hover:text-gray-200 border-blue-600",
      inactiveClasses:
        "text-gray-700 hover:bg-gray-100 hover:text-gray-600 dark:text-gray-700 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-900",
      onShow: () => {
        //console.log("tab is shown");
      },
    };

    /*
     * tabElements: array of tab objects
     * options: optional
     */
    const tabs = new Tabs(tabElements, options);
    tabs.show("clubs");
  }, []);

    return (
      <div className='pb-6 pt-4 md:ml-[79px] ml-0 pr-4 bg-white  overflow-auto'>

   
      <div className="w-full  rounded-2xl pb-8 text-gray-700 bg-[#ebe9f2]">
        <div className="w-full">
          <div class="pl-6 pt-3 flex">
            <Link href="/resources">
            <BiArrowBack className="inline-block text-2xl mr-2" />


            </Link>
            <h1 class="md:text-xl text-lg font-bold">
              {roomDetails[0]?.name}
            </h1>
          </div>
        </div>
        <div className="md:px-4 px-2 ">
          <div className="">
              <div className="mt-4 md:mt-0">
                <div className="">

                  <div className="mb-4 mt-6 border-gray-200 dark:border-gray-700">
                    <ul
                      className="flex flex-wrap -mb-px text-sm gap-y-1 font-medium text-center"
                      id="myTab"
                      data-tabs-toggle="#myTabContent"
                      role="tablist"
                    >
                      <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg bg-[#e0f0fc] text-black"
                          id="clubs-tab"
                          data-tabs-target="#clubs"
                          type="button"
                          role="tab"
                          aria-controls="clubs"
                          aria-selected="false"
                        >
                          <BsLink className="text-xl mr-2" />
                          Website Links
                        </button>
                      </li>
                      <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg bg-[#e6f5e5] hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="dashboard-tab"
                          data-tabs-target="#dashboard"
                          type="button"
                          role="tab"
                          aria-controls="dashboard"
                          aria-selected="false"
                        >
                          <GoPencil className="text-xl mr-2"/>
                          Handwritten
                          </button>
                      </li>
                      <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg bg-[#efcfcf] hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="repositories-tab"
                          data-tabs-target="#repositories"
                          type="button"
                          role="tab"
                          aria-controls="repositories"
                          aria-selected="false"
                        >
                          <SlSocialYoutube className="text-xl mr-2" />
                          YouTube Links
                        </button>
                      </li>
                      <li className="mr-2"  role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg bg-[#9a8a84] hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="contacts-tab"
                          data-tabs-target="#contacts"
                          type="button"
                          role="tab"
                          aria-controls="contacts"
                          aria-selected="false"
                        >
                          <BsFiletypePdf className="text-xl mr-2"/>
                          PDFs
                          </button>
                      </li>
                      <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg bg-[#fdf3e4] hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="screenshot-tab"
                          data-tabs-target="#screenshot"
                          type="button"
                          role="tab"
                          aria-controls="screenshot"
                          aria-selected="false"
                        >
                          <MdPhotoSizeSelectActual className="text-xl mr-2"/>
                          Screenshots
                          </button>
                      </li>
                      <li role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg bg-[#d7a1dc] hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="other-tab"
                          data-tabs-target="#other"
                          type="button"
                          role="tab"
                          aria-controls="other"
                          aria-selected="false"
                        >
                          <BsFolder className="text-xl mr-2"/>
                          Other
                          </button>
                      </li>
                    </ul>
                  </div>

        
                  <div id="myTabContent" className="mt-5">
                    <div
                      className="hidden "
                      id="clubs"
                      role="tabpanel"
                      aria-labelledby="clubs-tab"
                    >
                      {
                        roomDetails2 && <WebsiteLink roomDetails={roomDetails2}/>
                      }

                    </div>
                    <div
                      className="hidden  "
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      {
                        roomDetails2 && <HandWritten roomDetails={roomDetails2}/>
                      }
                     
                    </div>
                    <div
                      className="hidden "
                      id="repositories"
                      role="tabpanel"
                      aria-labelledby="repositories-tab"
                    >
                      {
                        roomDetails2 && <Youtube roomDetails={roomDetails2} />
                      }
                    </div>
                    <div
                      className="hidden"
                      id="contacts"
                      role="tabpanel"
                      aria-labelledby="contacts-tab"
                    >
                      {
                        roomDetails2 && <PDFGalleryPage resourceId={roomId}/>
                      }
                    </div>

                    


                    <div
                      className="hidden"
                      id="screenshot"
                      role="tabpanel"
                      aria-labelledby="screenshot-tab"
                    >
                      {
                        roomDetails2 && <GalleryPage resourceId={roomId}/>
                      }
                    </div>
                    
                    <div
                      className="hidden"
                      id="other"
                      role="tabpanel"
                      aria-labelledby="other-tab"
                    >
                      {
                        roomDetails2 && <Other roomDetails={roomDetails2}/>
                      }

                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      </div>
    )
}


export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('database');

  const searchRoute = context.params.driveName;

  const roomData = await db
    .collection('rooms')
    .find({ name: searchRoute })
    .sort({ metacritic: -1 })
    .toArray();

  const roomDetails = JSON.parse(JSON.stringify(roomData));

  return {
    props: { roomDetails },
  };
}
