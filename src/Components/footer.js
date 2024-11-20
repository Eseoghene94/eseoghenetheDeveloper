import Link from 'next/link';
import React from 'react';
import Layout from './Layout';

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-base sm:text-lg px-4 sm:px-8 md:px-16 lg:px-32">
      <Layout className="py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        {/* Current Year and Rights */}
        <span className="mb-2 md:mb-0">
          {new Date().getFullYear()} &copy; All Rights Reserved.
        </span>

        {/* Built By Section */}
        <div className="flex items-center justify-center mb-2 md:mb-0">
          Built with <span className="text-primary text-xl px-1">&#9825;</span>
          by&nbsp;
          <Link
            href="https://www.github.com/eseoghene94/"
            target="_blank"
            className="underline underline-offset-2"
          >
            CODEwithESE
          </Link>
        </div>

        {/* Say Hello Link */}
        <Link
          href="https://www.github.com/eseoghene94/"
          target="_blank"
          className="underline underline-offset-2"
        >
          Say Hello!
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;



// import Link from 'next/link'
// import React from 'react'
// import layout from './Layout'

// const footer = () => {
//   return (
//     <footer className='w-full border-t-2 border-solid border-dark font-medium text-lg px-32'>
//         <layout className='py-8 flex items-center justify-between'>
//             <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
//             <div className='flex items-center '>
//             Built with <span className='text-primary text-2xl px-1'>&#9825;</span> by &nbsp;<Link href='https://www.github.com/eseoghene94/' target={'_blank'} className='underline underline-offset-2'>CODEwithESE</Link>
//             </div>
//             <Link href='https://www.github.com/eseoghene94/' target={'_blank'} className='underline underline-offset-2'>Say Hello!</Link>
//         </layout>
//     </footer>
//   )
// }

// export default footer