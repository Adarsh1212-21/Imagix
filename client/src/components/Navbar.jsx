import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { user, setShowLogin, logout } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className='flex items-center justify-between'>
            <Link to='/'>
                <img src={assets.logo} alt="" className='w-44 sm:w-52 lg:w-64 py-4' />
            </Link>
            <div>
                {user ?
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <p className='text-grey-600 max-sm:hidden pl-4'>Hello {user.name}</p>
                        <div className='relative group'>
                            <img src={assets.profile_icon} alt="logo" className='w-7 h-7 sm:w-9 sm:h-9 lg:w-11 lg:h-11' />
                            <div className='absolute top-0 right-0 z-10 text-black rounded pt-12 hidden group-hover:block'>
                                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                    <li onClick={handleLogout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-8 text-sm rounded-full'>Login</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar