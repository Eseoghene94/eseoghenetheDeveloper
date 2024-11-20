import Head from 'next/head';
import Image from 'next/image';
import profilePic from '../../public/images/profile/developer-pic-1.png';
import AnimatedText from '@/Components/AnimatedText';
import Link from 'next/link';
import HireMe from '@/Components/HireMe';
import { LinkArrow } from '@/Components/icons';
import lightbulb from '../../public/images/svgs/miscellaneous_icons_1.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>CODEwithESE</title>
        <meta name="description" content="A Sound Portfolio" />
      </Head>
      <main className="flex items-center text-dark w-full min-h-screen">
        <layout className="pt-0">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            {/* Profile Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <Image
                src={profilePic}
                alt="CODEwithESE"
                className="w-3/4 h-auto lg:w-full"
                priority
              />
            </div>

            {/* Text and Links Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start px-4 sm:px-8 md:px-16 lg:px-32 self-center mt-8 lg:mt-0">
              <AnimatedText
                text="Turning Vision Into Reality With Code And Design."
                className="!text-4xl md:!text-5xl lg:!text-6xl text-center lg:!text-left !text-blue-800"
              />
              <p className="my-4 text-sm sm:text-base md:text-lg font-medium text-center lg:text-left">
                As a skilled full-stack developer, I am dedicated to turning
                ideas into innovative web applications. Explore my latest
                projects and articles, showcasing my expertise in React.js,
                Next.js, and web development.
              </p>
              <div className="flex flex-col sm:flex-row items-center self-center lg:self-start mt-2">
                <Link
                  href="/EseogheneDavid.pdf"
                  target="_blank"
                  className="flex items-center bg-dark text-light px-6 py-2.5 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark"
                  download={true}
                >
                  Resume <LinkArrow className="w-6 ml-1" />
                </Link>
                <Link
                  href="mailto:eseoghenedavid1@gmail.com"
                  target="_blank"
                  className="mt-4 sm:mt-0 sm:ml-4 text-lg font-medium capitalize text-dark underline underline-offset-2"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </layout>
        <HireMe />
        <div className="absolute right-4 sm:right-8 bottom-4 sm:bottom-8 inline-block w-16 sm:w-24">
          <Image src={lightbulb} alt="CODEwithESE" className="w-full h-auto" />
        </div>
      </main>
    </>
  );
}


// import Head from 'next/head'
// import Image from 'next/image'
// import profilePic from '../../public/images/profile/developer-pic-1.png'
// import AnimatedText from '@/Components/AnimatedText'
// import Link from 'next/link'
// import HireMe from '@/Components/HireMe'
// import { LinkArrow } from '@/Components/icons'
// import lightbulb from '../../public/images/svgs/miscellaneous_icons_1.svg'

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>CODEwithESE</title>
//         <meta name="description" content="A Sound Portfolio" />
       
//       </Head>
//       <main className='flex items-center text-dark w-full min-h-screen'>
//         <layout className='pt-0'>
//         <div className='flex items-center justify-between w-full'>
//           <div className='w-1/2'>
//             <Image src={profilePic} alt='CODEwithESE' className='w-full h-auto'/>
//           </div>
//           <div className='w-1/2 flex flex-col items-center px-32 self-center'>
//             <AnimatedText text='Turning Vision Into Reality With Code And Design.' className='!text-6xl !text-left !text-blue-800'/>
//             <p className='my-4 text-base font-medium'>As a skilled full-stack developer, I am dedicated to turning ideas into innovative web applications. 
//             Explore my latest projects and articles, showcasing my expertise in React.js, Next.js and web development.</p>
//             <div className='flex items-center self-start mt-2'>
//               <Link href='/EseogheneDavid.pdf' target={'_blank'}
//               className='flex items-center bg-dark text-light px-6 p-2.5 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark'
//               download={true}
//               >Resume <LinkArrow className='w-6 ml-1'/>
//               </Link>
//               <Link href='mailto:eseoghenedavid1@gmail.com' target={'_blank'}
//               className='ml-4 text-lg font-medium capitalize text-dark underline underline-offset-2 '
//               >Contact</Link>
//             </div>
//           </div>
//         </div>
//         </layout>
//         <HireMe/>
//         <div className='absolute right-8 bottom-8 inline-block w-24'>
//             <Image src={lightbulb} alt='CODEwithESE' className='w-full h-auto'/>
//           </div>
//       </main>
//     </>
//   )
// }
