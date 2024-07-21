"use client"
import React from "react";
import Link from "next/link";
import { UserAuth } from "./Context/authContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="top-0 left-0 right-0 flex flex-col md:flex-row justify-between p-4">
      <div className="flex items-center space-x-2">
        <img
          src="https://i.pinimg.com/564x/39/3e/a3/393ea365b6f7a25d70d8713389f6d44c.jpg"
          alt="genrex logo"
          className="h-10 w-10"
        />
        <span className="font-bold text-lime-500 text-xl">imagine</span>
      </div>
      <ul className="flex flex-col md:flex-row gap-4 mt-5 md:mt-0">
        <li>
          <Link href="/explore" className="bg-black rounded-md px-4 py-2 text-lime-500 text-center">
            EXPLORE
          </Link>
        </li>
        <li>
          <Link href="/" className="bg-black rounded-md px-4 py-2 text-lime-500 text-center">
            CREATE
          </Link>
        </li>
        <li>
          <Link href="/history" className="bg-black rounded-md px-4 py-2 text-lime-500 text-center">
            HISTORY
          </Link>
        </li>
      </ul>

      <div className="flex items-center space-x-2 mt-4 md:mt-0">
        {!user ? (
          <img
            src="https://i.pinimg.com/564x/e9/9f/64/e99f6475d7821a4e854d404637e6afeb.jpg"
            alt="menu icon"
            className="h-14 w-14 rounded-lg cursor-pointer"
            onClick={handleSignIn}
          />
        ) : (
          <div className="text-center">
            <h4>Welcome, {user?.displayName}</h4>
            <button
              type="button"
              onClick={handleSignOut}
              className="bg-black rounded-md px-4 py-2 text-lime-500 text-center mt-2"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
