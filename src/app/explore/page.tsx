"use client"
import React, { useState } from 'react';
import Navbar from '../Navbar';
import imageData from '../imageData';

const Page = () => {
  const [input, setInput] = useState("");
  const [filteredImages, setFilteredImages] = useState(imageData);
  const [noMatch, setNoMatch] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = imageData.filter(image => image.desc.toLowerCase().includes(input.toLowerCase()));
    setFilteredImages(filtered);
    setNoMatch(filtered.length === 0);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center mt-10 px-4">
        <input
          type="text"
          placeholder="Explore-Lakeside Quiet House"
          value={input}
          onChange={handleChange}
          className="w-full md:w-3/4 lg:w-1/2 h-10 rounded-lg px-4 bg-black text-lime-500 focus:outline-none"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 md:mt-0 md:ml-4 px-4 py-1 bg-black h-10 text-lime-500 rounded-lg hover:bg-lime-600 hover:text-black focus:outline-none"
        >
          Submit
        </button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 px-4'>
        {noMatch ? (
          <p className="text-lime-500 text-center col-span-3">No such images created</p>
        ) : (
          filteredImages.map((image) => (
            <div key={image.id} className="flex flex-col items-center">
              <img src={image.url} alt="image" className='w-full max-w-xs h-auto rounded-md border-4 bg-cover border-black' />
              <p className='text-center font-medium mt-2'>{image.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
