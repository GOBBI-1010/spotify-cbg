import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from 'react-router-dom'


const Player = () => {
  const {
    seekBar,
    seekBg,
    play,
    pause,
    playStatus,
    track,
    time,
    after,
    before,
    seekBgClick,
    audioRef,
  } = useContext(PlayerContext);
  const Navbar = () => {
    const nav = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [showAccount, setShowAccount] = useState(false)
    const [showSubscription, setShowSubscription] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
  }
  const [volume, setVolume] = useState(1); // Default volume is 100%
  const [isLooping, setIsLooping] = useState(false); // Loop state
  const [isFullScreen, setIsFullScreen] = useState(false); // Full-screen state

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
      setIsLooping(audioRef.current.loop);
    }
  };

  const downloadSong = () => {
    if (audioRef.current && audioRef.current.src) {
      const link = document.createElement('a');
      link.href = audioRef.current.src;
      link.download = `${track.name}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No audio source found!');
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const handleSeekBarClick = (e) => {
    const seekBarWidth = seekBg.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const newTime = (offsetX / seekBarWidth) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };

  const handleSeekBarChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
  };

  // Update the seek bar progress
  useEffect(() => {
    if (audioRef.current) {
      const interval = setInterval(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (seekBar.current) {
          seekBar.current.style.width = `${(currentTime / duration) * 100}%`;
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [audioRef.current]);

  return (
    <div className={`h-[10%] bg-black flex justify-between items-center text-white px-4 ${isFullScreen ? 'absolute top-0 left-0 w-full h-full z-50 flex-col justify-between' : ''}`}>
      {/* Full-Screen View */}
      {isFullScreen && (
        <div className="absolute inset-0  flex justify-between items-center text-white p-10 bg-black bg-opacity-10 ">
          {/* Close Icon */}
          <img
            onClick={closeFullScreen}
            className="w-6 absolute top-5 right-5 cursor-pointer"
            src={assets.close_icon}
            alt="Close"
          />
          
          {/* Left: Image */}
          <div className="flex items-center justify-center w-1/3">
            <img className="w-48" src={track.image} alt={track.name} />
          </div>
          
          {/* Right: Song Info */}
          <div className="w-2/3 pl-2">
            <h2 className="text-4xl">{track.name}</h2>
            <p className="mt-2 ">{track.desc}</p>
            <div className="mt-0 flex gap-3 pl-80">
              <img onClick={before} className="w-6 cursor-pointer" src={assets.prev_icon} alt="" />
              {playStatus ? (
                <img onClick={pause} className="w-6 cursor-pointer" src={assets.pause_icon} alt="" />
              ) : (
                <img onClick={play} className="w-6 cursor-pointer" src={assets.play_icon} alt="" />
              )}
              <img onClick={after} className="w-6 cursor-pointer" src={assets.next_icon} alt="" />
              <img
                onClick={toggleLoop}
                className={`w-4 cursor-pointer ${isLooping ? 'opacity-100' : 'opacity-50'}`}
                src={assets.loop_icon}
                alt="Loop"
              />
              
            </div>

            {/* Seek Bar */}
            <div className="flex items-center gap-5 mt-4">
              <p>{time.currentTime.minute}:{time.currentTime.second}</p>
              <div
                ref={seekBg}
                onClick={handleSeekBarClick}
                className="w-[80%] max-w-[700px] bg-gray-300 rounded-full cursor-pointer"
              >
                <hr
                  ref={seekBar}
                  className="h-1 border-none w-0 bg-green-800 rounded-full"
                />
              </div>
              <p>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
            <div className="hidden lg:flex  mt-9  pl-80 items-center gap-2 opacity-75">
            <img className="w-4" src={assets.volume_icon} alt="Volume" />
            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-green-800 h-1 rounded-lg cursor-pointer text-green-500"
            />
            {/* Download Icon */}
            <img onClick={downloadSong} className="w-4 cursor-pointer" src={assets.download1_icon} alt="Download" />
          </div>          </div>
        </div>
        
      )}

      {/* Normal View */}
      {!isFullScreen && (
        <div className="flex justify-between items-center w-full">
          {/* Track Info */}
          <div className="flex items-center gap-4">
            <img className="w-12 hidden md:block" src={track.image} alt="" />
            <div className='hidden md:block'>
              <p>{track.name}</p>
              <p>{track.desc.slice(0, 16) + "..."}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-1 m-auto">
            <div className="flex gap-4">
              <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
              <img onClick={before} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
              {playStatus ? (
                <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="" />
              ) : (
                <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="" />
              )}
              <img onClick={after} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
              <img
                onClick={toggleLoop}
                className={`w-4 cursor-pointer ${isLooping ? 'opacity-100' : 'opacity-50'}`}
                src={assets.loop_icon}
                alt="Loop"
              />
            </div>

            {/* Seek Bar */}
            <div className="flex items-center gap-5 ">
              <p>{time.currentTime.minute}:{time.currentTime.second}</p>
              <div
                ref={seekBg}
                onClick={handleSeekBarClick}
                className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
              >
                <hr
                  ref={seekBar}
                  className="h-1 border-none w-0 bg-green-800 rounded-full"
                />
              </div>
              <p>{time.totalTime.minute}:{time.totalTime.second}</p>
            </div>
          </div>

          {/* Additional Controls and Volume */}
          <div className="flex lg:flex items-center gap-2 opacity-75">
            <img className="w-4  hidden lg:flex" src={assets.mic_icon} alt="" />
            <img  className="w-4  hidden lg:flex cursor-pointer" src={assets.queue_icon} alt="" />
            <img className="w-4  hidden lg:flex" src={assets.speaker_icon} alt="" />
            <img className="w-4  hidden lg:flex" src={assets.volume_icon} alt="Volume" />
            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20  hidden lg:flex accent-green-800 h-1 rounded-lg cursor-pointer text-green-500"
            />
            <img className="w-4 cursor-pointer mt-6 ml-2 sm:mt-5 md:mt-0 " onClick={toggleFullScreen} src={assets.zoom_icon} alt="" />
            {/* Download Icon */}
            <img onClick={downloadSong} className="w-4 cursor-pointer  hidden lg:flex " src={assets.download1_icon} alt="Download" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
