import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Timer from "../components/tools/timer";
import { FaMusic } from "react-icons/fa";
import AudioComponent from "../components/tools/Audio";
import {GrFormNextLink} from "react-icons/gr";
import {GrFormPreviousLink} from "react-icons/gr";

const PomodoroPage = () => {
  const [quote, setQuote] = useState([]);
  const [videoSources, setVideoSources] = useState([
    "./videos/bg-1.mp4",
    "./videos/bg-2.mp4",
    "./videos/bg-3.mp4",
    "./videos/bg-4.mp4"
  ]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

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
        } while (randomQuote && randomQuote.text.split(" ").length > 12);

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

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.load();
    videoElement.play();
  }, [currentVideoIndex]);

  const changeVideoSource = (direction) => {
    if (direction === "previous") {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === 0 ? videoSources.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videoSources.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="w-full md:justify-around grid h-min-screen overflow-auto text-gray-700 bg-gray-200 to-90% h-screen md:flex">
      <Head>
        <title>Self Study</title>
      </Head>
      <video
        ref={videoRef}
        controls={false}
        autoPlay={true}
        muted={true}
        loop={true}
        className="h-full fixed object-cover w-full z-0"
      >
        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
      </video>

      <div className="h-fit flex pl-24 ml-4 mt-4 w-fit justify-start place-content-start">
      <AudioComponent />
        {/* ... */}
      </div>

      <div className="h-fit grid mx-auto z-10 mt-4 w-fit justify-center backdrop-blur-md p-2 bg-white/40 rounded-xl place-content-center ">
        <h1 className="text-black font-bold md:text-xl text-sm">
          &quot;{quote?.text}&quot;
        </h1>
        <p className="text-black font-bold md:text-sm text-xs mx-auto">
          - {quote?.author || "Anonymous"}
        </p>
      </div>

      <div className="h-fit z-10 md:flex w-fit pt-4 top-0 fixed md:relative  md:bottom-4 bottom-20 right-4 justify-end place-content-end ">
      <button
          className=""
          onClick={() => changeVideoSource("previous")}
        >
          <GrFormPreviousLink className="backdrop-blur-md bg-white/60 hover:bg-gray-400 text-white  md:text-2xl text-xl rounded-l" />
        </button>
        <button
          className=""
          onClick={() => changeVideoSource("next")}
        >
          <GrFormNextLink className="backdrop-blur-md bg-white/60 hover:bg-gray-400 text-white  md:text-2xl text-xl rounded-r" />
        </button>
      </div>

      <div className="fixed md:bottom-4 bottom-20 right-4 justify-center flex">
      <Timer />
      </div>
    </div>
  );
};

export default PomodoroPage;
