import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white p-4 flex justify-content items-center gap-96'>
         <h1 className='text-3xl font-bold'><span className='text-amber-700'>A</span>darsh</h1>
            <ul className='flex gap-30 text-lg'>
                <li className='hover:text-amber-700 cursor-pointer'>Home</li>
                <li className='hover:text-amber-700 cursor-pointer'>About</li>
                <li className='hover:text-amber-700 cursor-pointer'>Contact</li>
            </ul>
    </nav>
  )
}

export default Navbar
