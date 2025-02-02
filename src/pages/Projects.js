import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout';
import AnimatedText from '@/components/animated-text';
import Link from 'next/link';
import { GithubIcon } from '@/components/icons';
import Image from 'next/image';
import { motion } from 'framer-motion';

import project1 from '../../public/images/projects/crypto-screener-cover-image.jpg';
import project2 from '../../public/images/projects/Sella.png';
import project3 from '../../public/images/projects/Ifeoluwa.png';
import project4 from '../../public/images/projects/CODEwithESE.png';
import project5 from '../../public/images/projects/Citi View Hotel.png';
import project6 from '../../public/images/projects/SchoolBOOKS —A.png';
import project7 from '../../public/images/projects/fashion-studio-website.jpg';
import project8 from '../../public/images/projects/Influencer-website.png';

const projects = [
  {
    type: "Featured Project",
    title: "Crypto Screener Application",
    summary: "A feature-rich Crypto Screener App using React, Tailwind CSS, Context API, and React Router. It provides details regarding almost all cryptocurrencies and allows easy price conversion.",
    img: project1,
    link: "/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "Sella Website",
    summary: "A Multi-Vendor Ecommerce Store connecting Clients and Businesses seamlessly.",
    img: project2,
    link: "https://sales-sella.vercel.app/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "Ifeoluwa Portfolio Website",
    summary: "A Professional Portfolio Website showcasing Tailoring Skills and Baking Expertise.",
    img: project3,
    link: "https://ifeoluwa-portfolio-khaki.vercel.app/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "CODEwithESE",
    summary: "A professional portfolio website using React, Framer-motion, and Styled-components. It features smooth transitions, cool background effects, a unique design, and mobile responsiveness.",
    img: project4,
    link: "https://eseoghenethedeveloper.vercel.app/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "Citi-View Website",
    summary: "A Hotel Website for Bookings and Reservations.",
    img: project5,
    link: "https://bookhotelng.vercel.app/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "SchoolBOOKS Website",
    summary: "A sleek Multi-Vendor Ecommerce Website.",
    img: project6,
    link: "/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "Fashion Studio Website",
    summary: "A Sleek Fashion Studio Website.",
    img: project7,
    link: "/",
    github: "https://github.com/eseoghene94"
  },
  {
    type: "Featured Project",
    title: "Influencer Website",
    summary: "An Influencer Booking Website.",
    img: project8,
    link: "https://idyllic-dusk-052ce1.netlify.app/",
    github: "https://github.com/eseoghene94"
  }
];

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="w-full flex flex-col md:flex-row items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-4 md:p-12"
    >
      <Link href={link} target="_blank" className="w-full md:w-1/2 cursor-pointer overflow-hidden rounded-lg mb-4 md:mb-0">
        <Image src={img} alt={title} className="w-full h-auto" />
      </Link>
      <div className="w-full md:w-1/2 flex flex-col items-start justify-between pl-0 md:pl-6">
        <span className="text-primary font-medium text-lg md:text-xl">{type}</span>
        <Link href={link} target="_blank" className="hover:underline underline-offset-2">
          <h2 className="my-2 w-full text-left text-2xl md:text-4xl font-bold">{title}</h2>
        </Link>
        <p className="my-2 font-medium text-dark">{summary}</p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-8 md:w-10"><GithubIcon /></Link>
          <Link href={link} target="_blank" className="ml-4 rounded-lg bg-dark text-light p-2 px-4 md:px-6 text-base md:text-lg font-semibold hover:text-primary">
            Visit Project
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <>
      <Head>
        <title>CODEwithESE | Projects Page</title>
        <meta name='description' content='A showcase of my latest projects' />
      </Head>
      <main className='w-full mb-16 flex flex-col items-center justify-center'>
        <Layout className='pt-16'>
          <AnimatedText text='Imagination Trumps Knowledge!' className='mb-16' />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12'>
            {projects.map((project, index) => (
              <div key={index} className='col-span-1'>
                <FeaturedProject {...project} />
              </div>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default Projects;


// "use client";

// import React from "react";
// import Layout from "@/app/components/layout";
// import AnimatedText from "@/app/components/animated-text";
// import Link from "next/link";
// import { GithubIcon } from "@/app/components/icons";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const projects = [
//   {
//     type: "Featured Project",
//     title: "Crypto Screener Application",
//     summary: "A feature-rich Crypto Screener App using React, Tailwind CSS, context API and React Router. It shows detail regarding almost all the cryptocurrencies. You can easily convert the price...",
//     img: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200",
//     link: "/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "Sella Website",
//     summary: "A Multi-Vendor Ecommerce Store to seamlessly connect with Clients and Businesses",
//     img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200",
//     link: "https://sales-sella.vercel.app/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "Ifeoluwa Portfolio Website",
//     summary: "A Professional Portfolio Website for my Client to showcase her Tailoring Skills and Baking Expertise",
//     img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200",
//     link: "https://ifeoluwa-portfolio-khaki.vercel.app/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "CODEwithESE",
//     summary: "A professional portfolio website using React JS, Framer-motion, and Styled-components. It has smooth page transitions, cool background effects, unique design and it is mobile responsive...",
//     img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
//     link: "https://eseoghenethedeveloper.vercel.app/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "Citi-View Website",
//     summary: "An Hotel Website for Bookings and Reservations",
//     img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
//     link: "https://bookhotelng.vercel.app/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "SchoolBOOKS Website",
//     summary: "A sleek Multi-Vendor Ecommerce Website",
//     img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
//     link: "/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "Fashion Studio Website",
//     summary: "A Sleek Fashion Studio Website",
//     img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200",
//     link: "/",
//     github: "https://github.com/eseoghene94"
//   },
//   {
//     type: "Featured Project",
//     title: "Influencer Website",
//     summary: "An influencer book Website",
//     img: "https://images.unsplash.com/photo-1557425955-df376b5903c8?auto=format&fit=crop&q=80&w=1200",
//     link: "https://idyllic-dusk-052ce1.netlify.app/",
//     github: "https://github.com/eseoghene94"
//   }
// ];

// const FeaturedProject = ({ type, title, summary, img, link, github }) => {
//   return (
//     <motion.article 
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.1 }}
//       viewport={{ once: true }}
//       className="w-full flex flex-col rounded-2xl border border-solid border-zinc-200 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//     >
//       <Link 
//         href={link} 
//         target="_blank"
//         className="w-full aspect-[16/9] relative overflow-hidden"
//       >
//         <Image 
//           src={img} 
//           alt={title} 
//           fill
//           className="object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </Link>
//       <div className="flex flex-col flex-grow p-4 sm:p-6 space-y-3">
//         <span className="text-primary font-medium text-xs sm:text-sm">{type}</span>
//         <Link 
//           href={link} 
//           target="_blank" 
//           className="hover:underline underline-offset-2"
//         >
//           <h2 className="text-lg sm:text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
//             {title}
//           </h2>
//         </Link>
//         <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 flex-grow">
//           {summary}
//         </p>
//         <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
//           <Link 
//             href={github} 
//             target="_blank"
//             className="text-muted-foreground hover:text-primary transition-colors"
//           >
//             <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//           </Link>
//           <Link 
//             href={link} 
//             target="_blank"
//             className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
//           >
//             Visit Project
//           </Link>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// export default function Projects() {
//   return (
//     <main className="flex-1">
//       <Layout>
//         <div className="space-y-8 sm:space-y-12">
//           <AnimatedText 
//             text="Imagination Trumps Knowledge!" 
//             className="mb-4 sm:mb-8"
//           />
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//             {projects.map((project, index) => (
//               <FeaturedProject key={index} {...project} />
//             ))}
//           </div>
//         </div>
//       </Layout>
//     </main>
//   );
// }
