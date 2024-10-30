import React, { useState } from 'react'
import { api } from '../../axios'
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { useNavigate } from 'react-router-dom';

function SentRequest({isLoaded, setPopup, categories, formData}) {

  const [isSent, setSent] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const  handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();


      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("📍 Coordinates: ", { lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <h4 className='cursor-pointer hover:bg-yellow-50'><strong>{main_text}</strong> <small>{secondary_text}</small></h4>
        </li>
      );
    });
    
  const handleSubmit = async ()=>{
    const res = await api.post('worker/signup/', formData)
    console.log(res);
    if (res.status === 200){
      setSent(true);
    }
    else{
      setError(res.response.data)
    }
  }

  console.log("Status:", status);
console.log("Suggestions data:", data);
  return (
    <div className='w-full h-screen fixed flex top-0 justify-center bg-[#39393999]' onClick={()=>{setPopup(false)}}>
      <div onClick={(e)=>e.stopPropagation()} className='w-3/4 bg-white my-16 flex flex-col gap-4 px-16 py-9 rounded-lg'>
        <h2 className='font-semibold text-[#000000c6]'>Select the services that you are good at:</h2>
        <div className='bg-[#e9e3b43f] rounded-lg'>
          <div className='p-9 flex flex-wrap gap-4'>
            {categories.map((category, index) => (
              <div key={index} className='p-3 bg-[#bcbbbb]'>
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div  className='flex flex-col gap-5'>
          <div className='flex justify-between px-6'>
            <div className='w-2/6'>
              <li className='list-none mb-1'>Aadhaar Number</li>
              <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
            <div className='w-2/6'> 
              <li className='list-none mb-1'>Upload your certificate</li>
              <input type="file" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
          </div>
          <div className='flex justify-between px-6'>
            <div className='w-2/6'>
              <li className='list-none mb-1'>How much experience do you have ?</li>
              <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' />
            </div>
            <div className='w-2/6'> 
              <li className='list-none mb-1'>Your location</li>
              {/* <input type="text" className='border rounded-lg py-1 w-full outline-none px-2' /> */}
              <input
                value={value} className='border rounded-lg py-1 w-full outline-none px-2'
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"
              />
              {status === "OK" && <ul>{renderSuggestions()}</ul>}
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-2 items-center mt-9'>
            {!isSent&&<h3 className='rounded-full bg-[#3c5267de] w-2/6 py-2 text-center text-white font-semibold tracking-wider' onClick={handleSubmit}>Sent a Request</h3>}
            {isSent&&<h3 className='rounded-full bg-[#4aae3ed1] w-2/6 py-2 text-center text-white font-semibold tracking-wider'>Request sent</h3>}
            {isSent&&<p className='text-sm'>You will gain access to additional pages once approved by the admin. <span onClick={()=>navigate('/worker/')} className='hover:underline hover:text-yellow-400 cursor-pointer'>Please go to the login</span></p>}
        </div>
      </div>
    </div>
  )
}

export default SentRequest
