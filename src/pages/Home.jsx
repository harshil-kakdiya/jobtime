import React, { useState, useEffect } from "react";
import { Line } from "rc-progress";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchQuote();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(`${data.content} - ${data.author}`);
    } catch (error) {
      console.log("Error fetching quote:", error);
    }
  };

  const startProgress = () => {
    const start = startTime.getTime();
    const end = endTime.getTime();

    if (start <= end) {
      const totalTime = end - start;

      clearInterval(intervalId);

      const id = setInterval(() => {
        const now = new Date().getTime();

        if (now >= start && now <= end) {
          const elapsedTime = now - start;
          const newProgress = (elapsedTime / totalTime) * 100;
          setProgress(newProgress);

          if (newProgress >= 100) {
            clearInterval(id);
          }
        } else {
          setProgress(0);
        }
      }, 1000);

      setIntervalId(id);
    } else {
      setProgress(0);
    }
  };

  const handleStartTimeChange = (date) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    setEndTime(date);
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="py-4 px-4 flex justify-between items-center bg-purple-500 text-white">
        <h1 className="text-2xl font-bold">Time Tracker</h1>
        <div className="flex gap-2 items-center justify-center">
        <p>{currentTime.toLocaleTimeString()}</p>
        <button
        className={` w-12 h-12 flex items-center justify-center rounded-lg bg-purple-600 text-white shadow-lg focus:outline-none ${darkMode ? 'hover:bg-purple-400' : 'hover:bg-purple-800'}`}
        onClick={toggleDarkMode}
      >
        {darkMode ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
</svg>
 : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
 <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
}
      </button>
        </div>
        
      </header>
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="mb-4 w-full md:w-80 flax justify-between ">
          <label htmlFor="startTime" className="mr-2">JOB Start Time :</label>
          <DatePicker
            selected={startTime}
            onChange={handleStartTimeChange}
            showTimeSelect
            dateFormat="Pp"
            className={`p-2 border rounded-md w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 border-gray-300'}`}
          />
        </div>
        <div className="mb-4 w-full md:w-80 flax items-center justify-between">
          <label htmlFor="endTime" className="mr-2">JOB End Time :  </label>
          <DatePicker
            selected={endTime}
            onChange={handleEndTimeChange}
            showTimeSelect
            dateFormat="Pp"
            className={`p-2 border rounded-md w-full ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-gray-200 border-gray-300'}`}
          />
        </div>
        <button
          onClick={startProgress}
          className={`w-full md:w-80 bg-purple-400 text-white px-4 py-2 rounded-2xl shadow-md transition duration-300 ease-in-out ${darkMode ? 'hover:bg-purple-400' : 'hover:bg-purple-600'}`}
        >
          Start
        </button>
        <div className="w-full mt-8">
          <Line percent={progress} strokeWidth={2} strokeColor="#AF60EE" className="px-10 h-5/6 "/>
        </div>
        <div className="text-xl font-bold mt-4">
          {progress.toFixed(2)}% Complete
        </div>
      </div>
      <footer className="py-4 px-8 bg-purple-400 text-white rounded-tr-2xl rounded-tl-2xl">
        <p className="text-center">Quote:</p>
        <p className="text-center">{quote}</p>
      </footer>
      
    </div>
  );
};


export default Home