import clientPromise from "../../database/connectDB";
// import useSWR from "swr";
import { Tabs } from "flowbite";
import { useSession } from "next-auth/react";
import Reports from "../../components/profile/reports";
import MainProfile from "../../components/profile/mainProfile";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

import { CgProfile } from "react-icons/cg";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducer } from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";

import { toast } from "react-toastify";
import { getUser, getUsers, updateUser } from "../../lib/helper";
import TodoList from "../../components/tools/todolistProfile";


const data = [
  {
    text: "Join FindAlly",
    status: "Completed",
    id: "0-Join FindAlly",
  },
  {
    text: "Create Portfolio",
    status: "onProgress",
    id: "1-Create Portfolio",
  },
];

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function Profile({ userDetails }) {
  const { data: session } = useSession();
  //console.log(session + "userDetails");
  const [userDetailsData, setuserDetailsData] = useState(userDetails[0] || {});

  useEffect(() => {
    setuserDetailsData(userDetails[0]);
    //console.log(userDetailsData + "userDetailsData");
  }, [userDetails]);
  const [subjectMajor, setsubjectMajor] = useState(userDetailsData?.major || "");
  const [studyInterests, setstudyInterests] = useState(userDetailsData?.interests || []);

  const [personalityTraits, setPersonalityTraits] = useState(userDetailsData?.personalityTraits || []);
  const [cocurricularInterests, setcocurricularInterests] = useState(userDetailsData?.cocurricularInterests || []);



  const [availability, setavailability] = useState();

  const [userAge, setuserAge] = useState(userDetailsData?.age || 0);
  const [userGender, setuserGender] = useState(userDetailsData?.gender || "Male");

  const [userAboutMe, setuserAboutMe] = useState(userDetailsData?.about || "");
  const [userGoals, setuserGoals] = useState(userDetailsData?.goals || "");
  const [userStudyHabits, setuserStudyHabits] = useState(userDetailsData?.studyHabits || "");

  const [language, setLanguage] = useState("English");
  const [userLocation, setuserLocation] = useState();

  //  from  form file
  const [formData, setFormData] = useReducer(formReducer, {});

  const userId = userDetails[0]?._id;

  


  const queryClient = useQueryClient();
  const { data, error } = useQuery(["users", userId], () => getUser(userId));
  const UpdateMutation = useMutation((newData) => updateUser(userId, newData), {
    onSuccess: async (data) => {
      // queryClient.setQueryData('users', (old) => [data])
      queryClient.prefetchQuery("users", getUsers);
    },
  });

  useEffect(() => {
    const tabElements = [
      // {
      //   id: "dashboard",
      //   triggerEl: document.querySelector("#dashboard-tab"),
      //   targetEl: document.querySelector("#dashboard"),
      // },
      {
        id: "clubs",
        triggerEl: document.querySelector("#clubs-tab"),
        targetEl: document.querySelector("#clubs"),
      },
      {
        id: "repositories",
        triggerEl: document.querySelector("#repositories-tab"),
        targetEl: document.querySelector("#repositories"),
      },
    ];

    // options with default values
    const options = {
      defaultTabId: "repositories",
      activeClasses:
        "text-gray-200 bg-gray-800 hover:bg-gray-700 hover:text-gray-200 dark:text-gray-100 dark:hover:text-gray-200 border-blue-600 dark:border-blue-500",
      inactiveClasses:
        "text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-600 dark:text-gray-700 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-900",
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

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  // if (isLoading) return <div>
  //   <ul
  //                     className="flex flex-wrap -mb-px text-sm font-medium text-center"
  //                     id="myTab"
  //                     data-tabs-toggle="#myTabContent"
  //                     role="tablist"
  //                   >
  //                     <li className="mr-2" role="presentation">
  //                       <button
  //                         className="flex flex-row p-3 rounded-lg"
  //                         id="clubs-tab"
  //                         data-tabs-target="#clubs"
  //                         type="button"
  //                         role="tab"
  //                         aria-controls="clubs"
  //                         aria-selected="false"
  //                       >
  //                         Portfolio
  //                       </button>
  //                     </li>
  //                     <li className="mr-2" role="presentation">
  //                       <button
  //                         className="flex flex-row p-3 rounded-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
  //                         id="repositories-tab"
  //                         data-tabs-target="#repositories"
  //                         type="button"
  //                         role="tab"
  //                         aria-controls="repositories"
  //                         aria-selected="false"
  //                       >

  //                         Reports
  //                       </button>
  //                     </li>
  //                   </ul>
  //   <LoadingScreen />
  //   </div>;
  // if (isError) return <div>Error : {error}</div>;

  if (data) {
    let {
      name,
      email,
      age,
      gender,
      notifications,
      about,
      goals,
      studyHabits,
      availibility,
      interests,
      major,
      language,
    } = data;
  }

  const handleSubmitForm = async (e) => {
    document.getElementById("save-btn").disabled = true;
    document.getElementById("save-btn").textContent = "Saving...";
    e.preventDefault();
    //console.log("buttton");
    // let userName = `${formData.firstname ?? firstname} ${formData.lastname ?? lastname}`;
    let updated = Object.assign({}, data, formData);
    await UpdateMutation.mutate(updated);
    document.getElementById("save-btn").disabled = false;
    document.getElementById("save-btn").textContent = "Saved";
    toast.success("Portfolio updated", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

    });
    setuserDetailsData(updated);

    handleFormView();
  };

  const updateAboutMe = (e) => {
    setuserAboutMe(e.target.value.trim());
    formData.about = e.target.value.trim();
  };

  const updateGoals = (e) => {
    setuserGoals(e.target.value.trim());
    formData.goals = e.target.value.trim();
  };

  const updateStudyHabits = (e) => {
    setuserStudyHabits(e.target.value.trim());
    formData.studyHabits = e.target.value.trim();
  };


  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    if (checked) {
      setPersonalityTraits((prevTraits) => [...prevTraits, id]);
      formData.personalityTraits = [...personalityTraits, id];
    } else {
      setPersonalityTraits((prevTraits) =>
        prevTraits.filter((trait) => trait !== id)
      );
      formData.personalityTraits = formData.personalityTraits.filter(
        (trait) => trait !== id
      );
    }
  };



  const handleInterestChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setcocurricularInterests((prevInterests) => [...prevInterests, id]);
      formData.cocurricularInterests = [...cocurricularInterests, id];
    } else {
      setcocurricularInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== id)
      );
      formData.cocurricularInterests = formData.cocurricularInterests.filter(
        (interest) => interest !== id
      );
    }
  };



  const updateAvailibility = (e) => {
    setuserAvailibility(e.target.value.trim());
    formData.availibility = e.target.value.trim();
  };

  const updateInterests = (e) => {
    // setstudyInterests(e.target.value.trim());
    // formData.interests = e.target.value.trim();
    const originalString = e.target.value;
    var separatedArray = [];
    separatedArray = originalString.split(", ");
    //console.log(separatedArray);
    setstudyInterests(separatedArray);
    formData.interests = separatedArray;
    //console.log(formData.interests);
  };

  const updateMajor = (e) => {
    setsubjectMajor(e.target.value.trim());
    formData.major = e.target.value.trim();
  };

  const updateLanguage = (e) => {
    setLanguage(e.target.value.trim());
    formData.language = e.target.value.trim();
  };

  const updateAge = (e) => {
    setuserAge(e.target.value.trim());
    formData.age = e.target.value.trim();
  };

  const updateGender = (e) => {
    setuserGender(e.target.value.trim());
    formData.gender = e.target.value.trim();
  };

  const [serverTime, setServerTime] = useState(null);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch("/api/time");
        const data = await response.json();
        setServerTime(new Date(data.time));
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };

    fetchServerTime();
  }, []);

  const getGreeting = () => {
    if (!serverTime) return "";

    const currentHour = serverTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const [roomName, setRoomName] = useState("userProfile");

  useEffect(() => {
    setRoomName(userDetails[0]?._id);
    //console.log(roomName + "roomid");
  }, [roomName, userDetails]);

  return (
    <>
      <div className="w-full md:pl-[79px] pl-2 h-screen overflow-auto overflow-x-hidden text-gray-700  bg-white px-2">
        <div className="w-full backdrop-blur-md bg-white/50">
          <div className="py-3 ml-5">
            <h1 className="md:text-xl text-lg font-bold">
              {getGreeting()}, {userDetails[0]?.name}
            </h1>
          </div>
        </div>
        <div className="md:px-0 px-2  min-h-screen ">
          <div className="">
            <div className="grid md:grid-cols-5 md:gap-4">
              <div className="md:col-span-4 mt-4 md:mt-0 shadow  rounded-2xl bg-indigo-100 px-4 pb-4">
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
                      {/* <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="dashboard-tab"
                          data-tabs-target="#dashboard"
                          type="button"
                          role="tab"
                          aria-controls="dashboard"
                          aria-selected="false"
                        >
                          <CgProfile className=" text-lg mr-2" />
                          Profile
                        </button>
                      </li> */}
                      <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="clubs-tab"
                          data-tabs-target="#clubs"
                          type="button"
                          role="tab"
                          aria-controls="clubs"
                          aria-selected="false"
                        >
                          <RiAccountPinBoxLine className=" text-lg mr-2" />
                          Portfolio
                        </button>
                      </li>

                      <li className="mr-2" role="presentation">
                        <button
                          className="flex flex-row p-3 rounded-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="repositories-tab"
                          data-tabs-target="#repositories"
                          type="button"
                          role="tab"
                          aria-controls="repositories"
                          aria-selected="false"
                        >
                          <GoGraph className=" text-lg mr-2" />
                          Reports
                        </button>
                      </li>
                      {/* <li role="presentation">
                        <button
                          className="flex flex-row p-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="contacts-tab"
                          data-tabs-target="#contacts"
                          type="button"
                          role="tab"
                          aria-controls="contacts"
                          aria-selected="false"
                        >
                          <GiTrophy className="text-xl mr-2"/>
                          Achievements
                          </button>
                      </li> */}
                    </ul>
                  </div>

                  <div id="myTabContent" className="mt-5">
                    {/* <div
                      className="hidden  "
                      id="dashboard"
                      role="tabpanel"
                      aria-labelledby="dashboard-tab"
                    >
                      <MainProfile userDetails={userDetails} data={data} />
                    </div> */}
                    <div
                      className="hidden min-h-[550px]"
                      id="clubs"
                      role="tabpanel"
                      aria-labelledby="clubs-tab"
                    >
                      <div className="w-full rounded-2xl p-4">
      {!userDetailsData?.major &&
        !userDetailsData?.interests &&
        !userDetailsData?.availibility &&
        !userDetailsData?.about &&
        !userDetailsData?.goals &&
        !userDetailsData?.studyHabits && 
        (
          <div className="grid rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-4 rounded-t-2xl h-fit max-h-16 text-start justify-center place-content-center place-items-center">
              <BiErrorCircle className="w-8 h-8 mr-4 rounded-full text-gray-200" />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
                Portfolio not found
              </h3>
            </div>
            <p className="bg-white p-4 h-full rounded-b-2xl py-16 font-semibold text-center place-items-center">
              Create your Portfolio to get started
            </p>
          </div>
        )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {userDetailsData?.major && (
          <div className="grid rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start place-content-center place-items-center">
              <img
                src="portfolio/1.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
                Major
              </h3>
            </div>
            <p className="bg-white p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
              {userDetailsData?.major}
            </p>
          </div>
        )}


{userDetailsData?.interests?.length > 0 && (
          <div className="flex flex-col rounded-2xl  ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start place-content-center place-items-center">
              <img
                src="portfolio/2.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
              Study Interests
              </h3>
            </div>
            <p className="bg-white flex  flex-wrap p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
            {userDetailsData?.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-200 my-1 mx-2 rounded px-2 py-1 text-sm font-semibold text-gray-700"
                >
                  {interest}
                </span>
              ))}
            </p>
          </div>
        )}

        {userDetailsData?.age && (
          <div className="grid rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start justify-center place-content-center place-items-center">
              <img
                src="portfolio/3.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
                Personal Information
              </h3>
            </div>
            <p className="bg-white p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
              {" "}
              Age: {userDetailsData?.age} {userDetailsData?.gender || "Male"}
            </p>
          </div>
        )}

        {userDetailsData?.about && (
          <div className="grid rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start justify-center place-content-center place-items-center">
              <img
                src="portfolio/4.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
                About me
              </h3>
            </div>
            <p className="bg-white p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
              {userDetailsData?.about}
            </p>
          </div>
        )}

        {userDetailsData?.goals && (
          <div className="grid rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start justify-center place-content-center place-items-center">
              <img
                src="portfolio/5.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
                Goals
              </h3>
            </div>
            <p className="bg-white p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
              {userDetailsData?.goals}
            </p>
          </div>
        )}

        {userDetailsData?.studyHabits && (
          <div className="grid rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start justify-center place-content-center place-items-center">
              <img
                src="portfolio/6.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
                Study Habits
              </h3>
            </div>
            <p className="bg-white p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
              {userDetailsData?.studyHabits}
            </p>
          </div>
        )}

{userDetailsData?.personalityTraits?.length > 0 && (
  <div className="flex flex-col rounded-2xl bg-white">
    <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start place-content-center place-items-center">
      <img
        src="portfolio/10.png"
        className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
        alt=""
      />
      <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
        Personality Traits
      </h3>
    </div>
    <div className="bg-white p-4 h-full flex flex-wrap rounded-b-2xl font-semibold text-center place-items-center">
      {userDetailsData?.personalityTraits.map((personalityTrait, index) => (
        <span
          key={index}
          className="bg-gray-200 my-1 mx-2 rounded px-2 py-1 text-sm font-semibold text-gray-700"
        >
          {personalityTrait}
        </span>
      ))}
    </div>
  </div>
)}


{userDetailsData?.cocurricularInterests?.length > 0 && (
          <div className="flex flex-col rounded-2xl bg-white ">
            <div className="flex bg-gray-800 px-4 py-2 rounded-t-2xl h-fit max-h-16 text-start place-content-center place-items-center">
              <img
                src="portfolio/8.png"
                className="w-12 h-12 mr-4 bg-white object-fit p-1 rounded-full"
                alt=""
              />
              <h3 className="text-lg font-semibold leading-tight flex-1 text-gray-200">
              Co-curricular Interests
              </h3>
            </div>
            <p className="bg-white flex flex-wrap p-4 h-full rounded-b-2xl font-semibold text-center place-items-center">
            {userDetailsData?.cocurricularInterests.map((cocurricularInterests, index) => (
                <span
                  key={index}
                  className="bg-gray-200 rounded my-1 px-2 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  {cocurricularInterests}
                </span>
              ))}
            </p>
          </div>
        )}

      </div>
    </div>
                    </div>
                    <div
                      className="hidden "
                      id="repositories"
                      role="tabpanel"
                      aria-labelledby="repositories-tab"
                    >
                      <Reports userDetails={userDetails} />
                    </div>
                    {/* <div
                      className="hidden"
                      id="contacts"
                      role="tabpanel"
                      aria-labelledby="contacts-tab"
                    >
                      <ProfileAchievements trophies={userDetailsData.trophies || 0}/>
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="md:card h-fit w-fit mx-auto md:pb-8 pb-24  grid justify-center place-content-center ">
                <div className="relative">
                  <img
                    className="md:w-40 lg:w-48 w-20 mx-auto rounded-full mt-8 border-2 border-gray-400 bg-gray-200"
                    src={`https://robohash.org/${userId}`}
                    alt=""
                  />
                  {/* <div className="absolute bottom-2 left-44 p-1.5 bg-green-500 hover:border-2 cursor-pointer rounded-full w-fit h-fit"></div> */}
                </div>
                <div className="text-center mt-2 text-xl font-medium ">
                  {userDetails[0]?.name}
                </div>
                {/* <div className="text-center text-sm font-medium ">
                  @{userDetails[0]?.email.split("@")[0]}
                </div> */}
                <div className="text-center text-sm font-bold ">
                  @{userDetails[0]?.email.split("@")[0]}
                </div>
                {/* {
                  userDetails[0]?.email == session?.user?.email && (
                    <button
                  data-modal-target="authentication-modal"
                  data-modal-toggle="authentication-modal"
                  type="button"
                  className="inline-flex items-center justify-center ml-20 mb-2 my-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group "
                >
                  <span className="relative px-3 py-2 transition-all duration-300  bg-gradient-to-br from-green-400 to-blue-400 group-hover:from-green-400 group-hover:to-blue-400 hover:from-green-500 hover:to-blue-400  font-bold rounded-md group-hover:bg-opacity-0 text-black hover:text-white">
                    Edit Portfolio
                  </span>
                </button>
                  )
                } */}

                {userDetails[0]?.email == session?.user?.email && (
                  <>
                  <button
                    onClick={handleFormView}
                    type="button"
                    className="flex items-center justify-center mb-4 my-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group "
                  >
                    <span className="relative px-3 py-2 transition-all duration-300 bg-blue-300 hover:bg-blue-400  font-bold rounded-md text-gray-700 hover:text-gray-900">
                      Edit Portfolio
                    </span>
                  </button>
                  <div className="w-60">

                  <TodoList roomName={"profile"} />
                  </div>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>

        {isFormOpen && (
          <div className="bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-20 backdrop-blur-sm bg-black/30 grid place-content-center justify-center w-screen h-screen ">
            <div
              id="defaultModal"
              tabindex="-1"
              className="z-20 w-screen h-[calc(100%-1rem)] grid justify-center mb-4 p-4 overflow-x-hidden overflow-y-auto"
            >
              <div className=" w-full w-3xl max-h-full">
                <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="px-6 py-6 lg:px-8 ">
                    <div className="flex mb-4 w-full justify-between">
                      <h3 className="text-xl w-fit font-medium text-gray-900 dark:text-white">
                        Let&apos;s create your Portfolio
                      </h3>
                      <button
                        className=" text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  dark:hover:bg-gray-800 dark:hover:text-white"
                        onClick={handleFormView}
                        type="button"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    <form className="space-y-6" action="#">
                      <div>
                        <label
                          for="countries"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Major
                        </label>
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          defaultValue={subjectMajor}
                          onChange={updateMajor}
                        >
                          <option selected value="">Choose one field</option>
                          <option value="Computer-Science">
                            Computer Science
                          </option>
                          <option value="IIT-JEE">IIT-JEE</option>
                          <option value="GATE">GATE</option>
                          <option value="UPSC-MPSC">UPSC-MPSC</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex mb-2">
                          <label
                            for="brand"
                            className=" text-sm mr-2 font-medium text-gray-900 dark:text-white"
                          >
                            Study Interests
                          </label>
                          <span className="flex">
                            {studyInterests?.map((tag) => {
                              return (
                                <span
                                  key={tag}
                                  className="bg-gray-100 rounded border text-gray-800  p-1 text-xs mr-1"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                          </span>
                        </div>
                        <input
                          type="text"
                          name="tags"
                          defaultValue={studyInterests}
                          onChange={updateInterests}
                          id="techstack"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-navbarDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="add your interests"
                          required=""
                        />
                        <p className="text-gray-400 text-xs mt-2">
                          Note: Use{" "}
                          <code className="bg-gray-100 rounded border  text-gray-800 px-1 pb-1">
                            ,
                          </code>{" "}
                          +{" "}
                          <code className="bg-gray-100 rounded border  text-gray-800 p-1">
                            space
                          </code>{" "}
                          to seperate tags.
                        </p>
                      </div>

                      <div>
                        <label
                          for="numberinput"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Age
                        </label>
                        <input
                          type="number"
                          id="numberinput"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="add your age"
                          defaultValue={userAge}
                          onChange={updateAge}
                          required
                        />
                      </div>

                      <div>
                        <label
                          for="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Gender
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              defaultChecked={userGender === "Male"}
                              id="bordered-radio-4"
                              type="radio"
                              name="bordered-radio-1"
                              value="Male"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onClick={updateGender}
                            />
                            <label
                              for="bordered-radio-4"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Male 
                            </label>
                          </div>
                          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="bordered-radio-5"
                              defaultChecked={userGender === "Female"}
                              type="radio"
                              value="Female"
                              name="bordered-radio-1"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onClick={updateGender}
                            />
                            <label
                              for="bordered-radio-5"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          for="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Preferred Language
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                            defaultChecked={language === "English"}
                              id="bordered-radio-8"
                              type="radio"
                              value="English"
                              name="bordered-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={updateLanguage}
                            />
                            <label
                              for="bordered-radio-8"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              English
                            </label>
                          </div>
                          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              
                              id="bordered-radio-9"
                              defaultChecked={language === "Hindi"}
                              type="radio"
                              value="Hindi"
                              name="bordered-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={updateLanguage}
                            />
                            <label
                              for="bordered-radio-9"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Hindi
                            </label>
                          </div>
                          <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="bordered-radio-10"
                              defaultChecked={language === "Other"}
                              type="radio"
                              value="Other"
                              name="bordered-radio"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              onChange={updateLanguage}
                            />
                            <label
                              for="bordered-radio-10"
                              className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Other
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label
                          for="aboutMe"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          About Me
                        </label>
                        <textarea
                          id="aboutMe"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                          defaultValue={userAboutMe}
                          onChange={updateAboutMe}
                        ></textarea>
                      </div>

                      <div>
                        <label
                          for="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Goals
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                          defaultValue={userGoals}
                          onChange={updateGoals}
                        ></textarea>
                      </div>

                      <div>
                        <label
                          for="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Study Habits
                        </label>
                        <textarea
                          id="message"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                          defaultValue={userStudyHabits}
                          onChange={updateStudyHabits}
                        ></textarea>
                      </div>

                      <div className="sm:col-span-2 mt-4 p-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
                        <div className="">
                          <div className="grid">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              Personality Traits
                            </h3>
                          </div>
                        </div>
                        <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4 place-content-center">
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="social"
                              type="checkbox"
                              value="social"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("social")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="social"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Social
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="introvert"
                              type="checkbox"
                              value="introvert"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("introvert")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="introvert"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Introvert
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="organized"
                              type="checkbox"
                              value="organized"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("organized")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="organized"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Organized
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="goal-oriented"
                              type="checkbox"
                              value="goal-oriented"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("goal-oriented")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="goal-oriented"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Goal-Oriented
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="creative"
                              type="checkbox"
                              value="creative"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("creative")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="creative"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Creative
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="analytical"
                              type="checkbox"
                              value="analytical"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("analytical")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="analytical"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Analytical
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="punctual"
                              type="checkbox"
                              value="punctual"
                              name="bordered-checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={personalityTraits.includes("punctual")}
                              onChange={handleCheckboxChange}
                            />
                            <label
                              htmlFor="punctual"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Punctual
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2 mt-4 p-4 text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 md:p-4 dark:bg-navbarDark dark:text-white">
                        <div className="">
                          <div className="grid ">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              Co-curricular Interests
                            </h3>
                          </div>
                        </div>
                        <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-4 place-content-center">
                        <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                        <input
                          id="sports"
                          type="checkbox"
                          value="sports"
                          name="bordered-checkbox-2"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked={cocurricularInterests.includes("sports")}
                          onChange={handleInterestChange}
                        />
                        <label
                          htmlFor="sports"
                          className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Sports
                        </label>
                      </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="cooking"
                              type="checkbox"
                              value="cooking"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("cooking")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="cooking"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Cooking
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="reading"
                              type="checkbox"
                              value="reading"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("reading")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="reading"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Reading
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="art"
                              type="checkbox"
                              value="art"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("art")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="art"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Art
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="crafts"
                              type="checkbox"
                              value="crafts"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("crafts")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="crafts"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Crafts
                            </label>
                          </div>
                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="dance"
                              type="checkbox"
                              value="dance"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("dance")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="dance"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Dancing
                            </label>
                          </div>

                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="singing"
                              type="checkbox"
                              value="singing"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("singing")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="singing"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Singing
                            </label>
                          </div>

                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="travel"
                              type="checkbox"
                              value="travel"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("travel")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="travel"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Travel
                            </label>
                          </div>

                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="gardening"
                              type="checkbox"
                              value="gardening"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("gardening")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="gardening"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Gardening
                            </label>
                          </div>

                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="collecting"
                              type="checkbox"
                              value="collecting"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("collecting")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="collecting"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Collecting
                            </label>
                          </div>

                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="sleeping"
                              type="checkbox"
                              value="sleeping"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("sleeping")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="sleeping"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Sleeping
                            </label>
                          </div>

                          <div className="flex items-center pl-2 border border-gray-200 rounded dark:border-gray-700">
                            <input
                              id="debating"
                              type="checkbox"
                              value="debating"
                              name="bordered-checkbox-2"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              defaultChecked={cocurricularInterests.includes("debating")}
                              onChange={handleInterestChange}
                            />
                            <label
                              for="debating"
                              className="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Debating
                            </label>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleSubmitForm}
                        id="save-btn"
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Create My Portfolio
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('database');

  const searchRoute = `${context.params.userName}@gmail.com`;

  const userData = await db
    .collection('users')
    .find({ email: searchRoute })
    .sort({ metacritic: -1 })
    .toArray();

  const userDetails = JSON.parse(JSON.stringify(userData));

  return {
    props: { userDetails },
  };
}
