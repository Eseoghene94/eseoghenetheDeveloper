import React from 'react';
import { CircularText } from './icons';
import Link from 'next/link';

const HireMe = () => {
  return (
    <div className="fixed left-4 bottom-4 flex items-center justify-center overflow-hidden sm:left-8 sm:bottom-8 md:left-12 md:bottom-12">
      <div className="flex items-center justify-center w-32 h-auto relative sm:w-40">
        <CircularText className="fill-dark animate-spin-slow" />
        <Link
          href="mailto:eseoghenedavid1@gmail.com"
          className="flex items-center justify-center absolute left-1/2 top-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md 
          border border-solid border-dark w-12 h-12 rounded-full 
          text-sm font-semibold hover:bg-light hover:text-dark sm:w-16 sm:h-16 sm:text-base md:w-20 md:h-20"
        >
          Hire Me
        </Link>
      </div>
    </div>
  );
};

export default HireMe;


// import React from 'react'
// import { CircularText } from './icons'
// import Link from 'next/link'

// const HireMe = () => {
//   return (
//     <div className='fixed left-4 bottom-4 flex items-center justify-center overflow-hidden'>
//         <div className='flex items-center justify-center w-40 h-auto relative'>
// <CircularText className={'fill-dark animate-spin-slow'}/>
// <Link href='mailto:eseoghenedavid1@gmail.com' className='flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md border border-solid border-dark w-20 h-20 rounded-full font-semibold hover:bg-light hover:text-dark'>
// Hire Me</Link>
//         </div>
//     </div>
//   )
// }

// export default HireMe