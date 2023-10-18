import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [targetTime, setTargetTime] = useState(25 * 60); // Default target time is 25 minutes
  const [breakTime, setBreakTime] = useState(5 * 60); // Default break time is 5 minutes
  const [currentTime, setCurrentTime] = useState(targetTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    setCurrentTime(targetTime);
  }, [targetTime]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentTime(targetTime);
    setIsBreak(false);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (currentTime === 0) {
      // Timer has reached zero, handle break or reset
      setIsRunning(false);
      setIsBreak((prevIsBreak) => !prevIsBreak);
      if (isBreak) {
        setCurrentTime(targetTime);
      } else {
        setCurrentTime(breakTime);
      }
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, currentTime, isBreak, targetTime, breakTime]);

  const getTimerPercentage = () => {
    return (currentTime / (isBreak ? breakTime : targetTime)) * 100;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-row items-center justify-center backdrop-blur-md bg-black rounded-2xl p-3">
      <div className="relative w-20 h-20">
        <div
          className="absolute w-full h-full rounded "
          // style={{
          //   background: `conic-gradient(white 0% ${getTimerPercentage()}%, transparent 40% 100%)`,
          //   transform: `rotate(${90 - (getTimerPercentage() / 100) * 360}deg)`,
          //   border: '2px solid white',
          // }}
        ></div>
        <div className="absolute flex items-center justify-center w-full h-full">
          <h1 className="md:text-3xl text-xl font-bold text-white">{formatTime(currentTime)}</h1>
        </div>
      </div>

      <div className="flex flex-col ml-4">
        <div className="flex space-x-4 text-sm">
          <button
            className="px-2 py-1 rounded bg-blue-500 text-white focus:outline-none"
            onClick={isRunning ? pauseTimer : startTimer}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            className="px-2 py-1 rounded bg-red-500 text-white focus:outline-none"
            onClick={resetTimer}
          >
            Reset
          </button>
        </div>
        {!isRunning && (
  <div className="flex items-center justify-center mt-4 md:text-sm text-xs">
    <div className="flex space-x-4">
      <div className="flex flex-col">
        <div className="mb-2">
          <label htmlFor="targetTime" className="text-sm font-bold text-white">
            Target:
          </label>
          <input
            id="targetTime"
            type="number"
            className="border rounded ml-1.5 px-2 py-1 focus:outline-none sm:w-16 md:w-20"
            value={targetTime / 60}
            onChange={(e) => setTargetTime(parseInt(e.target.value) * 60)}
          />
        </div>
        <div className="">
          <label htmlFor="breakTime" className="text-sm font-bold text-white">
            Break:
          </label>
          <input
            id="breakTime"
            type="number"
            className="border rounded ml-2 px-2 py-1 focus:outline-none sm:w-16 md:w-20"
            value={breakTime / 60}
            onChange={(e) => setBreakTime(parseInt(e.target.value) * 60)}
          />
        </div>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Timer;
