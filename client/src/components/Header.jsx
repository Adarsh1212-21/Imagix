import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {motion} from "framer-motion" 
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  
    const {user,setShowLogin}=useContext(AppContext)
    const navigate=useNavigate()
    
    const images = [
  assets.House2,
  assets.city,
  assets.lake,
  assets.lake2,
  assets.house,
  assets.dragon
]

    const onClickHandler=()=>{
      if(user){
        navigate('/result')

      }else{
        setShowLogin(true)
      
    }
  }
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    >
      
      
      <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto  text-center '>Transform Ideas into <span className='text-blue-600'
      initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:0.4, duration:2}}
    >Images</span> </motion.h1>
      
      <motion.p className='text-center max-w-xl mx-auto mt-5'

      initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:0.6, duration:0.8}}
      >From idea to image in seconds.
Type your vision and let AI create it.</motion.p>

      <motion.button 
      onClick={onClickHandler}
      className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
      whileHover={{scale:1.05}}
      whileTap={{scale:0.95}}
      initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{default :{delay:0.4},opacity:{delay:0.8}, duration:1}}>Generate Images
        
      </motion.button>

      <motion.div
  className='grid grid-cols-3 sm:grid-cols-6 gap-4 mt-16 px-4'
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1, duration: 1 }}
>
  {images.map((img, index) => (
    <motion.img
      key={index}
      src={img}
      alt=""
      className="w-full h-20 sm:h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
    />
  ))}
</motion.div>
      <motion.p 
      initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.2, duration:0.8}}
      className='mt-2 text-neutral-600'>Generated image from Imagix</motion.p>
    </motion.div>
  )
}

export default Header
