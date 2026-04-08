import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-grey-500 mb-8'>Bring your imagination to life through visuals</p>


      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.panda} alt="" className='w-80 xl:w-96 rounded-lg' />
        <div >
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing to AI powered Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Easily turn your ideas into reality with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images in just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
            <p className='text-gray-600'>
                Simply enter a prompt, and our advanced AI will generate high-quality images within seconds. From product visuals and character designs to portraits and concepts that don’t even exist yet — everything can be visualized effortlessly. Powered by cutting-edge AI technology, the creative possibilities are endless.  
            </p>
        </div>
      </div>
    </div>
  )
}

export default Description
