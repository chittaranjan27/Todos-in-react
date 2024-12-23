import React from 'react'

function Navbar() {
  return (
   <nav className='flex justify-around bg-violet-700  text-white py-2'>
    <div className="logo">
      <span className='font-bold text-xl mx-9'>itask</span>
    </div>
    <ul className="flex gap-8 mx-9">
      <li className='cursor-pointer hover:font-bold transition-all'>Hpme</li>
      <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
    </ul>
   </nav>
  )
}

export default Navbar
