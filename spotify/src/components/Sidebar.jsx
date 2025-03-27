import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const translations = {
  en: {
    home: 'Home',
    search: 'Search',
    yourLibrary: 'Your Library',
    create:'create',
    createPlaylist: 'Create your first Playlist',
    playlistDescription: "It's easy, we will help you",
    createButton: 'Create playlist',
    findPodcasts: 'Find some Podcasts to Follow',
    podcastDescription: "We'll keep you updated on new episodes",
    browsePodcasts: 'Browse Podcasts',
    chooseLanguage: 'Choose Language',
  },
  ta: {
    home: 'முகப்பு',
    search: 'தேடு',
    yourLibrary: 'உங்கள் நூலகம்',
    create:'உருவாக்க',
    createPlaylist: 'முதல் இசை பட்டியலை உருவாக்கவும்',
    playlistDescription: 'இது எளிது, நாங்கள் உதவுவோம்',
    createButton: 'பட்டியலை உருவாக்கவும்',
    findPodcasts: 'பாட்காஸ்ட்களை பின்தொடரவும்',
    podcastDescription: 'புதிய எபிசோடுகள் வரும் போது நாங்கள் தகவல் அளிப்போம்',
    browsePodcasts: 'பாட்காஸ்ட்களை உலாவவும்',
    chooseLanguage: 'மொழியைத் தேர்வுசெய்க',
  },
  hi: {
    home: 'होम',
    search: 'खोजें',
    yourLibrary: 'आपकी लाइब्रेरी',
    create:'बनाएं',
    createPlaylist: 'अपनी पहली प्लेलिस्ट बनाएं',
    playlistDescription: 'यह आसान है, हम आपकी सहायता करेंगे',
    createButton: 'प्लेलिस्ट बनाएं',
    findPodcasts: 'कुछ पॉडकास्ट खोजें',
    podcastDescription: 'हम आपको नए एपिसोड के बारे में अपडेट रखेंगे',
    browsePodcasts: 'पॉडकास्ट ब्राउज़ करें',
    chooseLanguage: 'भाषा चुनें',
  },
};

const Sidebar = () => {
  const nav = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setIsDropdownVisible(false);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`https://masstamilan.dev/2212/annana-thaalaattum-mp3-song${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data && data.songId) {
        nav(`/play/${data.songId}`);
      } else {
        alert('Song not found');
      }
    } catch (error) {
      console.error('Error fetching song:', error);
      alert('Failed to fetch song');
    }
  };

  const t = translations[selectedLanguage];

  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
      {/* Top Section */}
      <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
        <div onClick={() => nav('/')} className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img className='w-6' src={assets.home_icon} alt='' />
          <p className='font-bold'>{t.home}</p>
        </div>
        <div className='flex items-center gap-3 pl-8 cursor-pointer'>
          <img
            className='w-6' src={assets.search_icon} alt='Search'
            onClick={() => setSearchActive(!searchActive)}
          />
          {!searchActive ? (
            <button className='font-bold'>{t.search}</button>
          ) : (
            <div className='flex items-center gap-2'>
              <input
                type='text'
                placeholder='Enter song name...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='px-2 py-1 bg-[#242424] text-white rounded-lg outline-none'
              />
              <button onClick={handleSearch} className='px-3 py-1 bg-green-800 text-white rounded-lg'>Go</button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className='bg-[#121212] h-[85%] rounded flex flex-col justify-between'>
        <div>
          {/* Library Section */}
          <div className='p-4 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <img className='w-8' src={assets.stack_icon} alt='' />
              <p className='font-semibold'>{t.yourLibrary}</p>
              <div className='flex items-center pl-5 gap-6 '>
              <span className='flex gap-3 px-3 py-1 rounded-2xl cursor-pointer text-white font-bold bg-[#242424] rounded-full'>
              <p className='font-semibold'>{t.create}</p>

                
                <img className='w-4 h-4 mt-1' src={assets.plus_icon} alt=""  />
                </span>
                <img className='w-4 ' src={assets.arrow_icon} alt="" />
                
            </div>
            </div>
            
          </div>
          
               

          {/* Playlist Section */}
          <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
            <h1>{t.createPlaylist}</h1>
            <p className='font-light'>{t.playlistDescription}</p>
            <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer'>{t.createButton}</button>
          </div>

          {/* Podcasts Section */}
          <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
            <h1>{t.findPodcasts}</h1>
            <p className='font-light'>{t.podcastDescription}</p>
            <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer'>{t.browsePodcasts}</button>
          </div>

          {/* Language Selection Custom Dropdown */}
          <div className='p-2 m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-6 mt-6'>
            <label className='text-[15px] text-white font-bold'>{t.chooseLanguage}</label>
            <div className='relative'>
              <button
                className='w-full px-9 py-2 bg-[#242424] text-white rounded-full cursor-pointer mt-2'
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                {selectedLanguage === 'en' ? 'English' : selectedLanguage === 'ta' ? 'தமிழ்' : 'Hindi'} 🌎︎
              </button>

              {isDropdownVisible && (
                <div ref={dropdownRef} className='relative mt-2 left-38 bottom-22 w-full bg-[#242424] text-white rounded-lg cursor-pointer'>
                  <ul className='text-white-400 mt-1'>
                    {Object.entries(translations).map(([key, value]) => (
                      <li
                        key={key}
                        onClick={() => handleLanguageChange(key)}
                        className='px-9 py-2 hover:bg-green-900 rounded-lg cursor-pointer'
                      >
                        {key === 'en' ? 'English' : key === 'ta' ? 'தமிழ்' : 'Hindi'} 🌎︎
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
