import Link from 'next/link';
import React, { useState } from 'react';
import Logo from './Logo';
import { useRouter } from 'next/router';
import {
  TwitterIcon,
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
  PinterestIcon,
} from './icons';
import { motion } from 'framer-motion';

const CustomLink = ({ href, title, className = '' }) => {
  const router = useRouter();

  return (
    <Link href={href} className={`${className} relative group text-lg`}>
      {title}
      <span
        className={`h-[1px] inline-block bg-dark 
        absolute left-0 -bottom-0.5 
        group-hover:w-full transition-[width] ease duration-100
        ${router.asPath === href ? 'w-full' : 'w-0'}`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4 sm:py-6 md:py-8 font-medium flex items-center justify-between relative bg-light">
      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>

      {/* Menu Button */}
      <button
        className="block md:hidden focus:outline-none"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        <div className="space-y-1">
          <span
            className={`block h-0.5 w-6 bg-dark transition-transform ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-dark transition-opacity ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-dark transition-transform ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </div>
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex items-center md:items-center justify-center flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-light shadow-md md:shadow-none z-10`}
      >
        <CustomLink href="/" title="Home" className="md:mr-4 py-2 md:py-0" />
        <CustomLink href="/About" title="About" className="md:mx-4 py-2 md:py-0" />
        <CustomLink href="/Projects" title="Projects" className="md:mx-4 py-2 md:py-0" />
        <CustomLink href="/Articles" title="Articles" className="md:ml-4 py-2 md:py-0" />
      </nav>

      {/* Social Media Icons */}
      <nav className="flex items-center justify-center flex-wrap">
        <motion.a
          href="https://twitter.com/iLoveBRESS/"
          target="_blank"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mr-3"
        >
          <TwitterIcon />
        </motion.a>
        <motion.a
          href="https://github.com/eseoghene94/"
          target="_blank"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <GithubIcon />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/eseoghene-ojiyovwi-ab4179189"
          target="_blank"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <LinkedInIcon />
        </motion.a>
        {/* <motion.a
          href="https://dribble.com"
          target="_blank"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 mx-3"
        >
          <DribbbleIcon />
        </motion.a>
        <motion.a
          href="https://pinterest.com"
          target="_blank"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.9 }}
          className="w-6 ml-3"
        >
          <PinterestIcon />
        </motion.a> */}
      </nav>
    </header>
  );
};

export default Navbar;


// import Link from 'next/link';
// import React, { useState } from 'react';
// import Logo from './Logo';
// import { useRouter } from 'next/router';
// import {
//   TwitterIcon,
//   DribbbleIcon,
//   GithubIcon,
//   LinkedInIcon,
//   PinterestIcon,
// } from './icons';
// import { motion } from 'framer-motion';

// const CustomLink = ({ href, title, className = '' }) => {
//   const router = useRouter();

//   return (
//     <Link href={href} className={`${className} relative group`}>
//       {title}
//       <span
//         className={`h-[1px] inline-block bg-dark 
//         absolute left-0 -bottom-0.5 
//         group-hover:w-full transition-[width] ease duration-100
//         ${router.asPath === href ? 'w-full' : 'w-0'}`}
//       >
//         &nbsp;
//       </span>
//     </Link>
//   );
// };

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4 sm:py-6 md:py-8 font-medium flex items-center justify-between relative">
//       {/* Logo */}
//       <div className="absolute left-1/2 transform -translate-x-1/2">
//         <Logo />
//       </div>

//       {/* Navigation Links */}
//       <button
//         className="block md:hidden"
//         onClick={() => setIsMenuOpen((prev) => !prev)}
//         aria-label="Toggle Menu"
//       >
//         <span className="hamburger"></span>
//       </button>
//       <nav
//         className={`${
//           isMenuOpen ? 'flex' : 'hidden'
//         } md:flex items-center justify-center flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-light md:bg-transparent shadow-md md:shadow-none z-10`}
//       >
//         <CustomLink href="/" title="Home" className="md:mr-4" />
//         <CustomLink href="About" title="About" className="md:mx-4" />
//         <CustomLink href="Projects" title="Projects" className="md:mx-4" />
//         <CustomLink href="Articles" title="Articles" className="md:ml-4" />
//       </nav>

//       {/* Social Media Icons */}
//       <nav className="flex items-center justify-center flex-wrap">
//         <motion.a
//           href="https://twitter.com/iLoveBRESS/"
//           target="_blank"
//           whileHover={{ y: -6 }}
//           whileTap={{ scale: 0.9 }}
//           className="w-6 mr-3"
//         >
//           <TwitterIcon />
//         </motion.a>
//         <motion.a
//           href="https://github.com/eseoghene94/"
//           target="_blank"
//           whileHover={{ y: -6 }}
//           whileTap={{ scale: 0.9 }}
//           className="w-6 mx-3"
//         >
//           <GithubIcon />
//         </motion.a>
//         <motion.a
//           href="https://www.linkedin.com/in/eseoghene-ojiyovwi-ab4179189"
//           target="_blank"
//           whileHover={{ y: -6 }}
//           whileTap={{ scale: 0.9 }}
//           className="w-6 mx-3"
//         >
//           <LinkedInIcon />
//         </motion.a>
//         <motion.a
//           href="https://dribble.com"
//           target="_blank"
//           whileHover={{ y: -6 }}
//           whileTap={{ scale: 0.9 }}
//           className="w-6 mx-3"
//         >
//           <DribbbleIcon />
//         </motion.a>
//         <motion.a
//           href="https://pinterest.com"
//           target="_blank"
//           whileHover={{ y: -6 }}
//           whileTap={{ scale: 0.9 }}
//           className="w-6 ml-3"
//         >
//           <PinterestIcon />
//         </motion.a>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;



// import Link from 'next/link'
// import React from 'react'
// import Logo from './Logo'
// import { useRouter } from 'next/router'
// import  {TwitterIcon, DribbbleIcon, GithubIcon, LinkedInIcon, PinterestIcon } from './icons'
// import { motion } from 'framer-motion'

// const CustomLink = ({href, title, className=``}) => {
//     const router = useRouter();
    
//     return(
//         <Link href={href} className={`${className} relative group`}>
//     {title}

//     <span  className={`h-[1px] inline-block bg-dark 
//     absolute left-0 -bottom-0.5 
//     group-hover:w-full transition-[width] ease duration-100
//     ${router.asPath === href ? 'w-full' : 'w-0'}
//     `}
//     >&nbsp;</span>
//     </Link>
//     )
// }
// const Navbar = () => {
//   return (
//     <header
//     className='w-full px-32 py-8 font-medium flex items-center justify-between'>
//         <nav>
//             <CustomLink href='/' title='Home' className='mr-4'/>
//             <CustomLink href='About' title='About' className='mx-4'/>
//             <CustomLink href='Projects' title='Projects' className='mx-4'/>
//             <CustomLink href='Articles' title='Articles' className='ml-4'/>
//         </nav>
        
//         <nav className='flex items-center justify-center flex-wrap'>
//         <motion.a href='https://twitter.com/iLoveBRESS/' target={'_blank'}
//         whileHover={{y:-6}}
//         whileTap={{scale:0.9}}
//         className='w-6 mr-3'
//         ><TwitterIcon/></motion.a>
//         <motion.a href='https://github.com/eseoghene94/' target={'_blank'}
//         whileHover={{y:-6}}
//         whileTap={{scale:0.9}}
//         className='w-6 mx-3'
//         ><GithubIcon/></motion.a>
//         <motion.a href='https:// www.linkedin.com/in/eseoghene-ojiyovwi-ab4179189' target={'_blank'}
//         whileHover={{y:-6}}
//         whileTap={{scale:0.9}}
//         className='w-6 mx-3'
//         ><LinkedInIcon/></motion.a>
//         <motion.a href='https://dribble.com' target={'_blank'}
//         whileHover={{y:-6}}
//         whileTap={{scale:0.9}}
//         className='w-6 mx-3'
//         ><DribbbleIcon/></motion.a>
//         <motion.a href='https://pinterest.com' target={'_blank'}
//         whileHover={{y:-6}}
//         whileTap={{scale:0.9}}
//         className='w-6 ml-3'
//         ><PinterestIcon/></motion.a>
//         </nav>
//         <div className='absolute left-[50%] translate-x-[-50%]'>
//         <Logo/>
//         </div>
//         </header>
//   )
// }

// export default Navbar