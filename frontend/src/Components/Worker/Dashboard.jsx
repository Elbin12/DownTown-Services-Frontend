import React, { useState } from 'react'
import AcceptedServices from './AcceptedServices'

function Dashboard() {
  const [isAvailable, setIsAvailable] = useState(true);


  const toggleWorkerStatus = () => {
      setIsAvailable(prevStatus => !prevStatus);
  };

  return (
    <div className='mt-28 mx-28'>
      {/* <div className="flex items-center justify-end gap-4 bg-white px-2 py-4">
        <h1 className="text-xl font-semibold">
            {isAvailable ? "Available" : "Unavailable"}
        </h1>
        <button
            onClick={toggleWorkerStatus}
            className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                isAvailable ? "bg-green-500" : "bg-gray-300"
            } relative`}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isAvailable ? "translate-x-6" : "translate-x-0"
                }`}
            ></div>
        </button>
      </div> */}
      <AcceptedServices/>
    </div>
  )
}

export default Dashboard
