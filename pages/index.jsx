import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { Heading, Button, Grid } from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react";
import Calendar from "@/components/calendar";
import {useDate} from "@/hooks/useDate";
import Link from "next/link";
// const inter = Inter({ subsets: ['latin'] })
import {LuArrowRight} from "react-icons/lu";

export default function Home() {
  
  const { date, time, wish } = useDate(); // custom hook
  
  const { push, asPath } = useRouter();
  const { data: session, status } = useSession({
    required: true,
		onUnauthenticated: () => {
      push('/join')
		},
	})
  const userId = session?.user?.id;
  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/join" });

    push(data.url);
  };

  const handleSignIn = () => push(`/join?callbackUrl=${asPath}`);

  // <div placeItems='center' className='grid' gridRowGap='1rem'>
  // 	{session ? (
  // 		<>
  // 			<h1>Signed in as {session.user.email}</h1>
  //   <img src={session.user.image} alt="" />
  // 			<button onClick={handleSignOut}>Sign out</button>
  // 		</>
  // 	) : (
  // 		<>
  // 			<h1>You are not signed in</h1>

  // 			<button onClick={handleSignIn}>Sign in</button>
  // 		</>
  // 	)}
  // </div>
	
  // Fetch the Request rooms of the current user

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


  const [quote, setQuote] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(`https://type.fit/api/quotes`);
        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }
        const jsonData = await response.json();
        
        let randomQuote = null;
        do {
          const randomIndex = Math.floor(Math.random() * jsonData.length);
          randomQuote = jsonData[randomIndex];
        } while (randomQuote && randomQuote.text.split(' ').length > 8);
  
        if (randomQuote) {
          setQuote(randomQuote);
        } else {
          console.error("No quotes found with less than 12 words.");
        }
      } catch (error) {
        console.error("An error occurred while fetching quotes:", error);
      }
    };
  
    fetchQuotes();
  }, []);
  
  
  const currentHour = new Date().getHours();
  //console.log(currentHour + "current Hour")

  let backgroundImage;
  if (currentHour >= 5 && currentHour < 12) {
    backgroundImage = '/banner/sunrise.png';
  } else if (currentHour >= 12 && currentHour < 18) {
    backgroundImage = '/banner/sunset.png';
  } else {
    backgroundImage = '/banner/night.png';
  }


  return (
    <div className="pb-6 pt-4 md:ml-[79px] ml-0 pl-2 md:pl-0 pr-2 bg-white min-h-screen  overflow-auto">
    <div className="w-full rounded-2xl pb-4 text-gray-700 min-h-screen bg-violet-100 ">
    <div className="w-full bg-yellow-100 md:pb-0 pb-4 rounded-t-2xl p-1">
      
      <div className="h-fit grid w-fit rounded-xl bg-white py-1 pl-4 pr-8 m-2 shadow place-content-start place-items-start justify-start">
        <div className="md:text-lg text-sm font-bold">{date}</div>
        {/* {wish} */}
        <div className="md:text-sm text-xs font-medium">{time}</div>
      </div>
      <div className="h-full flex place-content-center place-items-center justify-center relative">
        <p className="text-center text-sm md:text-lg md:-mt-14 mb-6">
          &quot;{quote?.text}&quot; - {quote?.author && quote?.author.replace(", type.fit", "") || "Anonymous"}
        </p>
      </div>
      <div className="h-full md:-mt-20 -mt-28 flex place-content-end place-items-end justify-end relative">
      <img
      className="object-cover object-right w-20 h-20 object-no-repeat"
      src={backgroundImage}
      alt="Time of Day"
    />
      </div>
    </div>
      <div className="md:px-10 px-2 mt-4">
        <div className="flex items-center flex-shrink-0 h-10">
          <span className="block text-xl font-bold">Your Ally Rooms</span>
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

          <a href={`/room/${room?.name}`} key={room?._id}
            className="relative flex flex-col items-start p-4 py-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100"
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
              {room?.name}
            </span>
            <h4 className="mt-1 text-sm font-medium mb-2">
              {room?.goal}
            </h4>
            <div className="flex justify-between items-center mb-2 w-full mt-3 text-xs font-medium text-gray-400 pt-6">
            <div className="flex">
              {room?.members?.map((member) => (
                <img key={member?.id}
                className="w-8 h-8 ml-auto bg-gray-300 mr-1 rounded-full"
                src={`https://robohash.org/${member?.id}`}
              />
              )) 
              }
              </div>
              <div className="flex items-center ">
                <div className="flex items-center ">
                <span className="ml-1 leading-none"><LuArrowRight  className="text-2xl"/></span>
              </div>
              </div>
              
              
            </div>
          </a>

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


        {/* <br />
        <span className="block text-xl mb-4 font-bold">Calendar</span>
        <Calendar /> */}
      </div>
      </div>
    </div>
  );
}
