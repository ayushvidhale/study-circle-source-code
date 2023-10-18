import clientPromise from "@/database/connectDB";
// import useSWR from "swr";
import { Tabs } from "flowbite";
import { Modal } from "flowbite";
import { ModalOptions, ModalInterface } from "flowbite";
// import { Key } from "react";
// import { useSession } from "next-auth/react";
// import Portfolio from "@/components/profile/portfolio";
// import Reports from "@/components/profile/reports";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

import Timer from "@/components/tools/timer";
import TodoList from "../../../components/tools/todolist";
import { IoCaretBack } from "react-icons/io5";
import { BiBookAlt } from "react-icons/bi";
import { IoVideocamOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import Link from "next/link";

import LoadingScreen from "@/components/animations/loadingScreen";
import { getUser, getUsers, updateUser } from "@/lib/helper";
import dynamic from "next/dynamic";
import AudioComponent from "../../../components/tools/Audio";

// const AblyChatComponent = dynamic(
//   () => import("@/components/AblyChatComponent"),
//   { ssr: false, loading: () => <LoadingScreen /> }
// );

import AblyChatComponent from "@/components/AblyChatComponent";

export default function Rooms({ roomDetails }) {
  console.log(roomDetails);
  const { data: session } = useSession();
  // useEffect(() => {
  //   const $modalElement = document.querySelector("#authentication-modal");

  //   const modalOptions = {
  //     placement: "bottom-right",
  //     backdrop: "dynamic",
  //     backdropClasses:
  //       "bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
  //     closable: true,
  //     onHide: () => {
  //       console.log("modal is hidden");
  //     },
  //     onShow: () => {
  //       console.log("modal is shown");
  //     },
  //     onToggle: () => {
  //       console.log("modal has been toggled");
  //     },
  //   };

  //   const modal = new Modal($modalElement, modalOptions);

  //   // modal.show();
  // }, []);

  // useEffect(() => {
  //   const $modalElement = document.querySelector("#authentication-modal");

  //   const modalOptions = {
  //     placement: "bottom-right",
  //     backdrop: "dynamic",
  //     backdropClasses:
  //       "bg-gray-700 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
  //     closable: true,
  //     onHide: () => {
  //       console.log("modal is hidden");
  //     },
  //     onShow: () => {
  //       console.log("modal is shown");
  //     },
  //     onToggle: () => {
  //       console.log("modal has been toggled");
  //     },
  //   };

  //   const modal = new Modal($modalElement, modalOptions);

  //   // modal.show();
  // }, []);

  const [roomName, setRoomName] = useState(roomDetails[0]?.name);
  const [roomId, setRoomId] = useState(roomDetails[0]?.id);

  useEffect(() => {

    setRoomId(roomDetails?.[0]?.id);
  console.log(roomId + "roomid");

  }, [roomDetails, roomId]);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: `${roomName}`,
      width: "100%",
      height: "100%",
      parentNode: document.querySelector("#meet"),
    };
    const api = new JitsiMeetExternalAPI(domain, options);

    return () => {
      api.dispose();
    };
  }, [roomName]);

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

  console.log(quote);

  return (
    <>
      <div className="w-full md:pl-[79px] pl-2  ml-0 h-screen overflow-auto text-gray-700  bg-indigo-100 ">
        <div className="md:px-4 px-2">
          <div className="w-full mt-4 rounded-xl backdrop-blur-md bg-white/70">
            <div className="flex justify-between">
              <div class="pl-4 py-2 flex flex-row my-auto">
                <Link href="/">
                  <IoCaretBack className=" text-lg mt-1 text-gray-200 bg-gray-700 mr-2 rounded" />
                </Link>
                { 
                      roomDetails[0]?.members[1]?.name === session?.user?.name ? (
                        <Link href={`/${roomDetails[0]?.members[0]?.email.split("@")[0]}`}>
                          <h1 class="md:text-lg mt-1 md:mt-0 text-sm font-bold hover:underline uppercase">
                          {roomDetails[0]?.members[0]?.name}
                        </h1>
                        </Link>
                        
                      ) : (
                        <Link href={`/${roomDetails[0]?.members[1]?.email.split("@")[0]}`}>
                        <h1 class="md:text-lg mt-1 md:mt-0 text-sm font-bold hover:underline uppercase">
                          {roomDetails[0]?.members[1]?.name}
                        </h1>
                        </Link>
                      )

                    }
              </div>
              <div className="flex justify-end my-auto">
                <button className="flex flex-row p-3 rounded-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                  <Link href={`/resources/${roomDetails[0]?.name}`}>
                    <BiBookAlt className="text-4xl p-2 mt-1 text-gray-200 bg-gray-700 mr-2 rounded" />
                  </Link>
                  {/* <IoVideocamOutline className="text-4xl p-2 mt-1 text-gray-200 bg-gray-700 mr-2 rounded" /> */}
                  {/* <IoEllipsisVerticalOutline className="text-lg text-gray-200 bg-gray-700 mr-2 rounded" /> */}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="grid md:grid-cols-5 md:gap-2">
              <div className="md:col-span-3 rounded-2xl p-2 pt-2">
                <div class="grid relative">
                  <div
                    id="meet"
                    style={{ overflow: "hidden" }}
                    className="backdrop-blur-md h-screen bg-white/80  rounded-xl mb-3"
                  ></div>

                  <div class="w-full h-3/4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                      <Timer />
                      <div className="w-full flex items-center justify-center bg-black rounded-2xl p-2">
                        <p className="text-center flex flex-wrap text-sm text-white">
                          &quot;{quote?.text}&quot; -{" "}
                          {quote?.author || "Anonymous"}
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-center bg-black rounded-2xl ">
                        <AudioComponent />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 w-full mt-2 mx-auto  md:pb-10 pb-20 ">
                <div class="grid bg-black rounded-2xl overflow-hidden ">
                  <div class="w-full h-1/6 pb-2 bg-black">
                    <div className="grid md:grid-cols-5 md:gap-2">
                        <Suspense fallback={<p>Loading...</p>}>
                        <TodoList roomName={roomName} />
                        </Suspense>
                    </div>
                  </div>
                  <div class="w-full h-fit ">
                    <h1 className="text-white font-bold pl-2 bg-gray-900 p-2">
                      Room Chat
                    </h1>
                    {/* <Suspense fallback={<p>Loading...</p>}> */}
                      <AblyChatComponent roomDetails={roomDetails} />
                    {/* </Suspense> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          [data-author="me"] {
            background: linear-gradient(
              to right,
              #363795,
              #005c97
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 0 !important;
            border-bottom-left-radius: 10px !important;
          }
        `}</style>
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db('database');

  const searchRoute = context.params.roomName;

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
