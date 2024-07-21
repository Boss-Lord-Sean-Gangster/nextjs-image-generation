"use client";
import React, { useState } from "react";
import { UserAuth } from "./Context/authContext";
import imageData from "./imageData";

const Widget = () => {
  const { user } = UserAuth();
  const [imageSrc, setImageSrc] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const generateImage = async () => {
    if (!inputValue.trim()) {
      // Display the large message if input is empty
      setShowMessage(true);
      return;
    }

    const userId = user?.uid;
    const userInfo = { prompt: inputValue }; // Assuming this is the required userInfo

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, userInfo }),
      });

      const result = await response.json();

      if (response.status === 429) { // Rate limit exceeded
        setError(result.error);
        return;
      }

      if (response.status !== 200) {
        throw new Error(result.error || 'An error occurred');
      }

      const randomImage = Math.floor(Math.random() * imageData.length);
      const Url = imageData[randomImage].url;
      setImageSrc(Url);
      setInputValue("");
      setError(""); // Clear any previous error
      setShowMessage(false); // Hide the message if input is valid

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center overflow-hidden justify-center min-h-screen bg-background text-lime-500 px-4">
      <header className="absolute top-0 left-0 right-0 flex justify-between p-4"></header>
      <div className="text-center mt-[-50px]">
        <video
          src={require("../../public/videos/wavySphere.mp4")}
          autoPlay
          muted
          loop
          className="absolute top-[-200px] left-0 right-0 w-full h-auto overflow-hidden no-scrollbar z-[-100]"
        />
        {showMessage ? (
          <div className="text-4xl md:text-6xl lg:text-8xl font-bold text-lime-500 mt-[-50px]">
            TURN YOUR WORDS INTO IMAGINATION
          </div>
        ) : (
          <div className={`${imageSrc ? "hidden" : "block"}`}>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-lime-500">
              TURN YOUR WORDS TO
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-lime-500">
              REALITY
            </h1>
          </div>
        )}
      </div>
      
      {imageSrc && (
        <div className="mt-8">
          <img src={imageSrc} alt="Generated" className="w-full max-w-lg h-auto rounded-md" />
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center mt-10">
        <input
          type="text"
          placeholder="Create Ex: A Beautiful Sunset"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 h-10 rounded-lg px-4 bg-black text-lime-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={generateImage}
          className="mt-4 md:mt-0 md:ml-4 px-4 py-1 bg-black h-10 text-lime-500 rounded-lg hover:bg-lime-600 hover:text-black focus:outline-none"
        >
          Generate
        </button>
      </div>
      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Widget;
