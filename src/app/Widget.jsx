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
    <div className="relative flex flex-col items-center overflow-hidden justify-center h-screen bg-background text-lime-500">
      <header className="absolute top-0 left-0 right-0 flex justify-between p-4"></header>
      <div className="text-center mt-[-50px]">
        <video
          src={require("../../public/videos/wavySphere.mp4")}
          autoPlay
          muted
          loop
          className="absolute top-[-200px] left-0 right-0 w-full overflow-hidden no-scrollbar z-[-100]"
        />
        {showMessage ? (
          <div className="text-6xl md:text-8xl font-bold text-lime-500 mt-[-50px]">
            TURN YOUR WORDS INTO IMAGINATION
          </div>
        ) : (
          <div className={`${imageSrc ? "hidden" : "block"}`}>
            <h1 className="text-6xl md:text-8xl font-bold text-lime-500">
              TURN YOUR WORDS TO
            </h1>
            <h1 className="text-6xl md:text-8xl font-bold text-lime-500">
              REALITY
            </h1>
          </div>
        )}
      </div>
      
      {imageSrc && (
        <div className="mt-8">
          <img src={imageSrc} alt="Generated" className="w-[400px] h-[400px]" />
        </div>
      )}
      <div className="flex justify-center mt-[100px]">
        <input
          type="text"
          placeholder="Create Ex: A Beautiful Sunset"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[600px] h-10 rounded-lg px-4 bg-black focus:outline-none"
        />
        <button
          type="submit"
          onClick={generateImage}
          className="ml-[-80px] px-4 py-1 bg-black h-10 text-lime-500 rounded-lg hover:bg-lime-600 hover:text-black focus:outline-none"
        >
          Submit
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      )}
      <footer className="mt-[100px] bottom-0 left-0 right-0 p-4 text-center text-sm font-semibold text-lime-500">
        <p>
          Explore our cutting-edge AI image generation tool to create diverse
          and wonderful images with your text in minutes.
        </p>
        <p>In partnership with Ai tools</p>
      </footer>
    </div>
  );
};

export default Widget;
