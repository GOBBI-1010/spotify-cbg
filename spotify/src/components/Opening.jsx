import React from 'react'
import background from '../assets/background-intro1.mp4'

const Opening = () => {
  return (
    <div className='h-screen bg-[#121212] flex items-center justify-center'>
        <video className='w-[100%]  mb-32 object-cover mix-blend-screen' src={background} preload='auto' autoPlay loop muted></video>
    </div>
  )
}

export default Opening