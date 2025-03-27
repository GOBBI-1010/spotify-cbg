import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import { albumsData, songsData, songsData1 } from "../assets/assets";
import AlbumItems from "./AlbumItems";
import SongItems from "./SongItems";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"; // Import the left and right  icons

const DisplayHome = () => {
  const albumsRef = useRef(null);
  const songsRef = useRef(null);
  const favoritesRef = useRef(null);

  const [scrolling, setScrolling] = useState(false); // To track if auto-scrolling is active
  const [scrollInterval, setScrollInterval] = useState(null); // To store the scroll interval ID

  const handleAutoScroll = (ref, direction) => {
    if (scrolling) {
      // If already scrolling, stop the interval
      clearInterval(scrollInterval);
      setScrolling(false);
    } else {
      // Start scrolling
      const interval = setInterval(() => {
        if (ref.current) {
          const scrollAmount = 3; // Slower scroll amount (5px per interval)
          if (direction === "right") {
            ref.current.scrollLeft += scrollAmount;
          } else if (direction === "left") {
            ref.current.scrollLeft -= scrollAmount;
          }
        }
      }, 20); // Scroll every 20ms for a slower effect
      setScrollInterval(interval);
      setScrolling(true);
    }
  };

  const handleStopScrolling = () => {
    // Stop scrolling when a song or album is clicked
    if (scrolling) {
      clearInterval(scrollInterval);
      setScrolling(false);
    }
  };

  const handleHover = () => {
    // Stop scrolling when hovering over a song
    if (scrolling) {
      clearInterval(scrollInterval);
      setScrolling(false);
    }
  };

  const handleMouseLeave = () => {
    // Resume scrolling when mouse leaves the song
    if (!scrolling) {
      setScrolling(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl flex justify-between items-center">
          Your Top Playlist
          <div className="flex items-center">
            <FaArrowLeft
              className="cursor-pointer mr-2 text-gray-600 bg-gray-300 p-1 rounded-full"
              onClick={() => handleAutoScroll(albumsRef, "left")} // Auto scroll left for albums
            />
            <FaArrowRight
              className="cursor-pointer text-gray-600 bg-gray-300 p-1 rounded-full"
              onClick={() => handleAutoScroll(albumsRef, "right")} // Auto scroll right for albums
            />
          </div>
        </h1>
        <div ref={albumsRef} className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              onClick={handleStopScrolling} // Stop scrolling when album is clicked
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl flex justify-between items-center">
          Recently Played
          <div className="flex items-center">
            <FaArrowLeft
              className="cursor-pointer mr-2 text-gray-600 bg-gray-300 p-1 rounded-full"
              onClick={() => handleAutoScroll(songsRef, "left")} // Auto scroll left for songs
            />
            <FaArrowRight
              className="cursor-pointer text-gray-600 bg-gray-300 p-1 rounded-full"
              onClick={() => handleAutoScroll(songsRef, "right")} // Auto scroll right for songs
            />
          </div>
        </h1>
        <div ref={songsRef} className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              onClick={handleStopScrolling} // Stop scrolling when song is clicked
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl flex justify-between items-center">
          Favourite Playlist
          <div className="flex items-center">
            <FaArrowLeft
              className="cursor-pointer mr-2 text-gray-600 bg-gray-300 p-1 rounded-full"
              onClick={() => handleAutoScroll(favoritesRef, "left")} // Auto scroll left for favorites
            />
            <FaArrowRight
              className="cursor-pointer  text-gray-600 bg-gray-300 p-1 rounded-full"
              onClick={() => handleAutoScroll(favoritesRef, "right")} // Auto scroll right for favorites
            />
          </div>
        </h1>
        <div ref={favoritesRef} className="flex overflow-auto">
          {songsData1.map((item, index) => (
            <SongItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
              onClick={handleStopScrolling} // Stop scrolling when song is clicked
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;

