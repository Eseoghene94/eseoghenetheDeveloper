import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

const Logo = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <MotionLink
        href="/"
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-dark text-light flex items-center justify-center rounded-full text-light text-lg sm:text-xl md:text-2xl font-bold"
        whileHover={{
          backgroundColor: [
            "#121212",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
          transition: { duration: 1, repeat: Infinity },
        }}
      >
        ESE
      </MotionLink>
    </div>
  );
};

export default Logo;



// import Link from 'next/link'
// import React from 'react'
// import { motion } from 'framer-motion'



// const MotionLink = motion(Link);
// const Logo = () => {
//   return (
//     <div className='flex items-center justify-center mt-2'>
//         <MotionLink href='/'
//         className='w-16 h-16 bg-dark text-ligt flex items-center justify-center rounded-full text-light text-2xl font-bold
//         '
//         whileHover={{
//             backgroundColor:["#121212", "rgba(131,58,180,1)","rgba(253,29,29,1)","rgba(252,176,69,1)","rgba(131,58,180,1)", "#121212"],
//             transition:{duration:1, repeat: Infinity}
//         }}
//         >ESE</MotionLink>
//     </div>
//   )
// }

// export default Logo