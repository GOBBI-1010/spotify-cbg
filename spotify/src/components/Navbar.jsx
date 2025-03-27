import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCrown, FaHeadset, FaDownload, FaCog, FaSignOutAlt, FaTimes, FaIdBadge, FaLock, FaBell, FaCreditCard, FaHistory, FaMapMarkerAlt, FaGift, FaRedoAlt, FaQuestionCircle } from 'react-icons/fa';

const Navbar = () => {
  const nav = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status
  const [showLogin, setShowLogin] = useState(true); // State to control the login popup visibility
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between login and signup

  // User profile state
  const [profile, setProfile] = useState({
    username: 'GOBBI-D',
    email: 'dgobbi30@gmail.com',
    gender: 'Male',
    dob: '30 September 2002',
    country: 'India',
    shareData: false,
   
  });

  const toggleMenu = () => setShowMenu(!showMenu);
  const openAccount = () => {
    setShowAccount(true);
    setShowMenu(false);
  };
  const closeAccount = () => setShowAccount(false);
  const openSubscription = () => setShowSubscription(true);
  const closeSubscription = () => setShowSubscription(false);

  // Handle Edit Profile click
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Handle save profile changes
  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle sign out action
  const handleSignOut = () => {
    setIsLoggedIn(false); // Update login status
  };

  // Login page component
  const LoginPage = () => (
    <div className='absolute top-0 left-215 w-150 m-40 h-40 text-white flex justify-center items-center'>
      <div className='bg-[#242424] p-8 rounded-lg shadow-xl w-96'>
        <FaTimes
          className='absolute right-30 cursor-pointer text-white'
          onClick={() => setShowLogin(false)} // Close login popup on click
        />
        <div className='flex justify-center mb-4'>
          <img className='w-20' src={assets.spotify_logo} alt='Logo' />
        </div>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-sm text-gray-400'>Email</label>
            <input
              type='email'
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm text-gray-400'>Password</label>
            
            <input
              type='password'
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Enter your password'
              required
            />
          </div>
          <button type='submit' className='bg-green-800 text-black py-2 cursor-pointer px-4 rounded-full font-bold w-full'>
            Log in
          </button>
        </form>
        <div className='mt-4'>
          <p className='text-sm text-gray-400 text-center'>
            Don't have an account?{' '}
            <a href='#' onClick={() => setIsSignUp(true)} className='text-blue-500'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  // Sign up page component
  const SignupPage = () => (
    <div className='absolute top-0 left-215 w-150 m-40 h-40 text-white flex justify-center items-center'>
      <div className='bg-[#242424] p-8 rounded-lg shadow-xl w-96'>
        <FaTimes
          className='absolute right-30 cursor-pointer text-white'
          onClick={() => setIsSignUp(false)} // Close signup popup on click
        />
        <div className='flex justify-center mb-4'>
          <img className='w-20' src={assets.spotify_logo} alt='Logo' />
        </div>
        <h2 className='text-2xl font-bold mb-4'>Sign up</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-sm text-gray-400'>Email</label>
            <input
              type='email'
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm text-gray-400'>Password</label>
            <input
              type='password'
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm text-gray-400'>Password</label>
            <input
              type='password'
              className='w-full p-2 rounded bg-gray-700 text-white'
              placeholder='Enter your password'
              required
            />
          </div>
          
          <button type='submit' className='bg-green-800 text-black py-2 px-4  cursor-pointer rounded-full font-bold w-full'>
            Sign up
          </button>
        </form>
        <div className='mt-4'>
          <p className='text-sm text-gray-400 text-center'>
            Already have an account?{' '}
            <a href='#' onClick={() => setIsSignUp(false)} className='text-blue-500'>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn && showLogin) {
    return isSignUp ? <SignupPage /> : <LoginPage />;
  }

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
          <img onClick={() => nav(-1)} className='w-8 bg-[#242424] p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt='' />
          <img onClick={() => nav(1)} className='w-8 bg-[#242424] p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt='' />
        </div>
        <div className='flex items-center gap-4'>
          <p onClick={openSubscription} className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
          <p className='bg-white text-black py-1 px-4 rounded-2xl text-[15px] cursor-pointer flex items-center space-x-2'>
            <img className='w-5 m-1' src={assets.dowload_icon} alt='' />
            Install App
          </p>
          <div className='relative'>
            <p onClick={toggleMenu} className='bg-white text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer'>G</p>
            {showMenu && (
              <div className='absolute right-0 mt-2 w-48 bg-[#242424] text-white rounded-lg shadow-lg z-50'>
                <div className='flex justify-end p-2'>
                  <FaTimes className='cursor-pointer' onClick={toggleMenu} />
                </div>
                <ul className='flex flex-col p-2 space-y-2'>
                  <li onClick={openAccount} className='cursor-pointer p-2 hover:bg-gray-700 rounded-lg flex items-center gap-2'><FaUser /> Account</li>
                  <li onClick={handleSignOut} className='cursor-pointer p-2 hover:bg-gray-700 rounded-lg flex items-center gap-2 hidden md:block '><FaSignOutAlt />Login</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Info Popup */}
      {showAccount && (
        <div className='absolute top-16 right-4 bg-[#242424] text-white p-5 rounded-lg w-80 shadow-lg z-50'>
          <FaTimes className='absolute top-3 right-3 cursor-pointer' onClick={closeAccount} />
          <div className='flex items-center gap-4 mb-4'>
            <img className='w-16 h-16 rounded-full' src={assets.user_icon} alt='User' />
            <div>
              <h2 className='text-xl font-bold'>GOBBI-D</h2>
              <p className='text-sm text-gray-400'>gobbi@2001gmail.com</p>
            </div>
          </div>
          <ul className='space-y-2'>
            <li onClick={handleEditProfile} className='cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg'><FaIdBadge /> Edit profile</li>
            <li onClick={openSubscription} className='cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg'><FaCrown /> Manage your subscription</li>
            <li className='cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg'><FaRedoAlt /> Recover playlists</li>
            <li className='cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg'><FaMapMarkerAlt /> Address</li>
            <li className='cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg'><FaCreditCard /> Payment</li>
            <li className='cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-700 rounded-lg'><FaHistory /> Order history</li>
            <li  className='cursor-pointer flex items-center gap-2   p-2 hover:bg-gray-700 rounded-lg'><FaSignOutAlt /> Sign out everywhere</li>
          </ul>
        </div>
      )}

      {/* Edit Profile Form */}
      {isEditing && (
        <div className='absolute top-16 right-4 bg-[#242424] text-white p-5 rounded-lg w-80 shadow-lg z-50'>
          <FaTimes className='absolute top-3 right-3 cursor-pointer' onClick={() => setIsEditing(false)} />
          <h2 className='text-2xl font-bold mb-4'>Edit Profile</h2>
          <form>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-400'>Username</label>
              <input type='text' name='username' value={profile.username} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-400'>Email</label>
              <input type='email' name='email' value={profile.email} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-400'>Gender</label>
              <select name='gender' value={profile.gender} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-400'>Date of Birth</label>
              <input type='text' name='dob' value={profile.dob} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-400'>Country or Region</label>
              <input type='text' name='country' value={profile.country} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' />
            </div>
            <div className='mb-4'>
              <label className='flex items-center'>
                <input type='checkbox' name='shareData' checked={profile.shareData} onChange={handleChange} className='mr-2' />
                Share my registration data with Spotify's content providers for marketing purposes.
              </label>
            </div>
            <button type='button' onClick={handleSaveProfile} className='bg-green-800 text-black py-2 px-4 rounded-full font-bold w-full'>
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Subscription Popup */}
      {showSubscription && (
        <div className='absolute top-16 right-4 bg-[#242424] text-white p-5 rounded-lg w-80 shadow-lg z-50 animate-fadeIn'>
          <FaTimes className='absolute top-3 right-3 cursor-pointer' onClick={closeSubscription} />
          <h1 className='text-2xl font-bold mb-4'>Manage your subscription</h1>
          <p className='text-sm text-gray-400'>Spotify Free</p>
          <ul className='list-disc list-inside space-y-2 mb-4'>
            <li>1 Free account</li>
            <li>Music listening with ad breaks</li>
            <li>Streaming only</li>
            <li>Songs play in shuffle</li>
            <li>Basic audio quality</li>
          </ul>
          <p className='text-lg font-semibold mb-4'>Free</p>
          <button onClick={() => alert('Successfully joined Premium!')} className='bg-green-800 text-black py-2 px-4 rounded-full font-bold cursor-pointer'>
            Join Premium
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
