
export default function Calendar(){

  
  const days2 = [
    {
    date: 1,
    events: [
    {
    name: "Meeting",
    time: "12:0014:00",
    },
    {
    name: "Meeting",
    time: "18:0020:00",
    },
    ],
    },
    {
    date: 2,
    events: [],
    },
    {
    date: 3,
    events: [],
    },
    {
    date: 4,
    events: [],
    },
    {
    date: 5,
    events: [],
    },
    {
    date: 6,
    events: [],
    },
    {
    date: 7,
    events: [
    {
    name: "Shopping",
    time: "12:00~14:00",
    },
    ],
    },
    {
    date: 8,
    events: [],
    },
    {
    date: 9,
    events: [],
    },
    {
    date: 10,
    events: [],
    },
    {
    date: 11,
    events: [],
    },
    {
    date: 12,
    events: [],
    },
    {
    date: 13,
    events: [],
    },
    {
    date: 14,
    events: [],
    },
    {
    date: 15,
    events: [],
    },
    ];
    

      // Get current local time
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      // Define month names
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      // Calculate the total number of days in the given month
      const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Generate an array of days for the month
      const days = [...Array(totalDays).keys()].map(day => day + 1);


    
    return (
    <>
    
    <div className="container pb-8">
    <div className="wrapper bg-gray-100 rounded shadow w-full ">
      <div className="header flex p-2 mb-4">
        <span className="text-sm font-bold text-black   border border-gray-600 p-1 rounded cursor-pointer">
          {monthNames[currentMonth]} {currentYear}
        </span>
       
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2 border-x border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Sunday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Sun</span>
            </th>
            <th className="p-2 border-r border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Monday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Mon</span>
            </th>
            <th className="p-2 border-r border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Tuesday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Tue</span>
            </th>
            <th className="p-2 border-r border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Wednesday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Wed</span>
            </th>
            <th className="p-2 border-r  border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Thursday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Thu</span>
            </th>
            <th className="p-2 border-r border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Friday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Fri</span>
            </th>
            <th className="p-2 border-r border-t h-10  lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
              <span className="xl:block lg:block md:block sm:block hidden text-black ">Saturday</span>
              <span className="xl:hidden lg:hidden md:hidden sm:hidden block text-black ">Sat</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center h-20">
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300">
              <div className="flex flex-col h-32  lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">1</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                  <div
                    className="event bg-purple-400 text-white rounded p-1 text-sm mb-1"
                  >
                    <span className="event-name">
                      Meeting
                    </span>
                    <span className="time">
                      12:00~14:00
                    </span>
                  </div>
                  <div
                    className="event bg-purple-400 text-white rounded p-1 text-sm mb-1"
                  >
                    <span className="event-name">
                      Meeting
                    </span>
                    <span className="time">
                      18:00~20:00
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">2</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">3</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">4</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">6</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-hidden  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">7</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                  <div
                    className="event bg-blue-400 text-white rounded p-1 text-sm mb-1"
                  >
                    <span className="event-name">
                      Shopping
                    </span>
                    <span className="time">
                      12:00~14:00
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">8</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
          </tr>

          <tr className="text-center h-20">
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">9</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">10</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">12</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">13</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">14</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">15</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">16</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
          </tr>
          
          <tr className="text-center h-20">
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">16</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">17</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">18</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">19</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                <div
                    className="event bg-purple-400 text-white rounded p-1 text-sm mb-1"
                  >
                    <span className="event-name">
                      Meeting
                    </span>
                    <span className="time">
                      18:00~20:00
                    </span>
                  </div>
                </div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">20</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">21</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">22</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
          </tr>
          
          <tr className="text-center h-20">
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">23</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">24</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">25</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">26</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">27</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">28</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">29</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
          </tr>
          
          <tr className="text-center h-20">
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">30</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">31</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border bg-gray-100  p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
                <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                  <div className="top h-5 w-full">
                    <span className="text-gray-500 dark:text-gray-400">1</span>
                  </div>
                  <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
                </div>
              </td>
            <td className="border bg-gray-100  p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">2</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border bg-gray-100  p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">3</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border bg-gray-100  p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400">4</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
            <td className="border bg-gray-100  p-1 h-32  lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto  cursor-pointer ease hover:bg-gray-300 ">
              <div className="flex flex-col h-32 mx-auto  lg:w-30 md:w-30 sm:w-full w-10 overflow-hidden">
                <div className="top h-5 w-full">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">5</span>
                </div>
                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer"></div>
              </div>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
    </>
    );
}