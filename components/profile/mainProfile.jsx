import { Modal } from "flowbite";
import { ModalOptions, ModalInterface } from "flowbite";
import React, { useState, useEffect } from "react";
import { FaStar, FaLock } from "react-icons/fa";

export default function MainProfile({ userDetails }) {
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/users");
        const responseData = await response.json();
        setUsersData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(usersData);

  return (
    <div className="w-full rounded-2xl p-4">
      <div class=" grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div class="flex items-start rounded-xl bg-white p-2 shadow-lg">
          <div class="flex h-12 w-12 items-center justify-center rounded border border-blue-100 bg-blue-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="font-semibold text-sm">Rank</h2>
            <p class=" text-bold text-gray-900">574</p>
          </div>
        </div>
        <div class="flex items-start rounded-xl bg-white p-2 shadow-lg">
          <div class="flex h-12 w-12 items-center justify-center rounded border border-orange-100 bg-orange-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="font-semibold text-sm">Progress Today</h2>
            <p class=" text-bold text-gray-900">70 %</p>
          </div>
        </div>
        <div class="flex items-start rounded-xl bg-white p-2 shadow-lg">
          <div class="flex h-12 w-12 items-center justify-center rounded border border-red-100 bg-red-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h2 class="font-semibold text-sm">Study Time</h2>
            <p class=" text-bold text-gray-900">5 hr</p>
          </div>
        </div>
      </div>

      <h1 class="text-xl font-bold my-2 mt-8">Weekly Streak</h1>
      <div class=" grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-7 xl:grid-cols-12 bg-white rounded-xl  p-2 shadow-lg">
        <div class="flex items-start rounded-xl bg-white p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>
        <div class="flex items-start rounded-xl bg-white p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>
        <div class="flex items-start rounded-xl bg-white p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>
        <div class="flex items-start rounded-xl bg-white p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>
        <div class="flex items-start rounded-xl bg-white p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>
        <div class="flex items-start rounded-xl bg-white  p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>
        <div class="flex items-start rounded-xl bg-white  p-4">
          <FaStar className="h-12 w-12 text-yellow-400" />
        </div>

        {/* <div class="grid col-span-2 items-start rounded-xl bg-gray-100 p-2">
          <div class="ml-4">
            <h2 class="font-semibold text-sm">Longest Streak Day</h2>
            <p class=" font-bold text-gray-900 text-xl">3</p>
          </div>
        </div> */}
        <div class="grid col-span-2 items-start rounded-xl bg-gray-100 p-2 ">
          <div class="ml-4">
            <h2 class="font-semibold text-sm">Longest Streak</h2>
            <p class=" font-bold text-gray-900 text-xl">5</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold my-2 mt-8">Stickers</h1>
        <div className="grid gap-2 grid-cols-4 lg:grid-cols-7 xl:grid-cols-12 bg-white rounded-xl p-2 shadow-lg">
          {/* Replace the star icon with image tags */}
          
          <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="./stickers/Awesome.png"
            alt=""
            class="w-full h-full overflow-hidden"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>


        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="./stickers/Blush.png"
            alt=""
            class="w-full h-full overflow-hidden"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>


        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="./stickers/Danger.png"
            alt=""
            class="w-full h-full overflow-hidden"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>


        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="./stickers/Eyes.png"
            alt=""
            class="w-full h-full overflow-hidden"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>

        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="./stickers/Heart.png"
            alt=""
            class="w-full h-full "
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>

        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
            alt=""
            class="w-full h-full overflow-hidden rounded-2xl"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>

        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
            alt=""
            class="w-full h-full overflow-hidden rounded-2xl"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>


        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
            alt=""
            class="w-full h-full overflow-hidden rounded-2xl"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>


        <div class="relative flex items-start rounded-xl bg-gray-100">
          <img
            src="https://media.tarkett-image.com/large/TH_24567081_24594081_24596081_24601081_24563081_24565081_24588081_001.jpg"
            alt=""
            class="w-full h-full overflow-hidden rounded-2xl"
          />
          <div class="absolute bottom-0 left-0 right-0 top-0 h-full rounded-2xl overflow-hidden bg-black bg-fixed opacity-30"></div>
          <FaLock className="absolute inset-0 m-auto text-4xl text-gray-100" />
        </div>
          
        </div>
      </div>

      <h1 class="text-xl font-bold my-2 mt-8">FA Cash</h1>
      <div class="flex items-start rounded-xl max-w-sm bg-white py-12 shadow-lg">
        <div class="mx-auto text-center place-content-center place-items-center grid">
          <h2 class="font-semibold text-sm">1 Hour = 10 FAC</h2>
          <p class=" text-bold text-gray-900">
            <span className="text-6xl font-bold">60</span> FAC
          </p>

          {/* add button heree */}
          <button class="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex">
            <FaStar className="h-6 w-6 text-yellow-400 mr-4" />
            FA Market
          </button>
        </div>
      </div>
    </div>
  );
}
