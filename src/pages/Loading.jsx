import { Line } from 'rc-progress';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Loading = () => {
  const [progress, setprogress] = useState(0)
  const nav =useNavigate();
    useEffect(() => {
      // Set a timeout to redirect to the home page after 2 seconds
      const timeout = setTimeout(() => {
       nav('/home'); // Redirect to the home page
      }, 6000);
  progressTracker();
      return; 
    }, [progress]);
 
  const progressTracker=()=>{
    if (progress < 100) {
      setTimeout(() => {
        setprogress(progress + 1);
      }, 50);
    }
  }
    return (
      <div className="w-full flex h-screen items-center justify-center ">
        <div className='h-10 flex flex-col items-center justify-center px-16'>
        <Line percent={progress} strokeWidth={2} strokeColor="#AF60EE" className="px-10 h-10 "/>
            <p>Loading...</p>
        </div>
        </div>
    );
  };

export default Loading