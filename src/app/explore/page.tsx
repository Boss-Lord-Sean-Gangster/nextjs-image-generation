"use client"
import React,{useState} from 'react'
import Navbar from '../Navbar'
import imageData from '../imageData'
const page = () => {
const [input, setInput] = useState("");
const [filteredImages, setFilteredImages] = useState(imageData);
const [noMatch, setNoMatch] = useState(false);
const handleChange = (e)=>{
    setInput(e.target.value)
}
const handleSubmit =(e)=>{
   e.preventDefault();
   const filtered = imageData.filter(image => image.desc.toLowerCase().includes(input.toLowerCase()));
    setFilteredImages(filtered);
    setNoMatch(filtered.length === 0);
}

  return (
    <div>
        <Navbar/>
        <div className="flex justify-center mt-[100px]">
        <input
          type="text"
          placeholder="Explore..."
          value={input}
          onChange={handleChange}
          className="w-[600px] h-10 rounded-lg px-4 bg-black text-lime-500 focus:outline-none"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="ml-[-80px] px-4 py-1 bg-black h-10 text-lime-500 rounded-lg hover:bg-lime-600 hover:text-black focus:outline-none"
        >
          Submit
        </button>
      </div>
      <div className='grid place-items-center  grid-cols-3 grid-rows-4 gap-10 mt-10 '>
      {noMatch ? (
          <p className="text-lime-500 text-center col-span-3">No such images created</p>
        ) : (
          filteredImages.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt="image" className='w-[250px] h-[250px] rounded-md border-4 bg-cover border-black' />
              <p className='text-center w-[250px] font-medium'>{image.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default page