
import React, { useId } from 'react';
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

import Youtube from '../../../components/resources/private/youtube';
import GalleryPage from '../../../components/resources/screenshot';
import Other from '../../../components/resources/private/other';
import PDFGalleryPage from '../../../components/resources/pdf';
import HandWritten from '../../../components/resources/private/handwritten';
import WebsiteLink from '../../../components/resources/private/websitelinks';
import {BiArrowBack} from "react-icons/bi"

import {BsLink} from "react-icons/bs"
import {GoPencil} from "react-icons/go"
import {SlSocialYoutube} from "react-icons/sl"
import {BsFiletypePdf} from "react-icons/bs"
import {MdPhotoSizeSelectActual} from "react-icons/md"
import {BsFolder} from "react-icons/bs"



export default function PrivateDrive(){

    const {data: session} = useSession();
    const [userId, setUserId] = useState();
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        if (!session?.user) return;
        setUserId(session.user.id);
        setUserDetails(session.user);
    }, [session?.user]);

    
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
      <div className='pb-6 pt-4 md:ml-[79px] min-h-screen ml-0 pr-4 bg-white  overflow-auto'>

   
        <div className="w-full  rounded-2xl pb-8 text-gray-700 bg-[#ebe9f2]">
        <div className="w-full">
          <div class="pl-6 pt-3 flex">
            <Link href="/resources">
            <BiArrowBack className="inline-block text-2xl mr-2" />

            </Link>
            <h1 class="md:text-xl text-lg font-bold">
              My Resources
            </h1>
          </div>
        </div>
        <div className="md:px-4 px-2 ">
          <div className="">
              <div className="mt-4 md:mt-0">
                <div className="">
                  {/* <nav className="flex my-8" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                      <li className="inline-flex items-center">
                        <Link
                          href="/"
                          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                          </svg>
                          Home
                        </Link>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <Link
                            href="/leaderboard"
                            className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                          >
                            profile
                          </Link>
                        </div>
                      </li>
                      <li aria-current="page">
                        <div className="flex items-center">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                            {userDetails[0]?.name}
                          </span>
                        </div>
                      </li>
                    </ol>
                  </nav> */}

                  <div className="mb-4 mt-6 border-gray-200 dark:border-gray-700">
                    <ul
                      className="flex flex-wrap -mb-px text-sm font-medium text-center"
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
                        userDetails && <WebsiteLink userDetails={userDetails} />
                      }
                    </div>
                    <div
                      className="hidden  "
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      {
                        userDetails && <HandWritten userDetails={userDetails} />
                      }
                    </div>
                    <div
                      className="hidden"
                      id="repositories"
                      role="tabpanel"
                      aria-labelledby="repositories-tab"
                    >
                      {
                        userDetails && <Youtube userDetails={userDetails} />
                      }
                    </div>
                    <div
                      className="hidden"
                      id="contacts"
                      role="tabpanel"
                      aria-labelledby="contacts-tab"
                    >
                      {
                        userId && <PDFGalleryPage resourceId={userId}/>
                      }
                      
                    </div>

                    <div
                      className="hidden"
                      id="screenshot"
                      role="tabpanel"
                      aria-labelledby="screenshot-tab"
                    >
                      {
                        userId && <GalleryPage resourceId={userId}/>
                      }
                    </div>
                    
                    <div
                      className="hidden"
                      id="other"
                      role="tabpanel"
                      aria-labelledby="other-tab"
                    >
                      {
                        userDetails && <Other userDetails={userDetails} />
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

