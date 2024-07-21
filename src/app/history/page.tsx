import React from 'react';
import Navbar from '../Navbar';

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className='flex justify-center items-center min-h-screen'>
        <h2 className='text-center text-lime-500 text-2xl md:text-3xl'>Coming Soon....</h2>
      </div>
    </div>
  );
};

export default Page;
