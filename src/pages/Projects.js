import React from 'react'
import Head from 'next/head'
import Layout from '@/Components/Layout'
import AnimatedText from '@/Components/AnimatedText'
import Link from 'next/link'
import { GithubIcon } from '@/Components/icons'
import project1 from '../../public/images/projects/crypto-screener-cover-image.jpg'
import project2 from '../../public/images/projects/Sella.png'
import project3 from '../../public/images/projects/Ifeoluwa.png'
import project4 from '../../public/images/projects/CODEwithESE.png'
import project5 from '../../public/images/projects/Citi View Hotel.png'
import project6 from '../../public/images/projects/SchoolBOOKS —A.png'
import project7 from '../../public/images/projects/fashion-studio-website.jpg'
import project8 from '../../public/images/projects/Influencer-website.png'
import Image from 'next/image'

const FeaturedProject = ({type, title, summary, img, link, github}) => {
  return(
    <article className='w-full flex flex-col md:flex-row items-center justify-between rounded-3xl border border-solid border-dark bg-light shadow-2xl p-4 md:p-12'>
      <Link href={link} target='_blank'
      className='w-full md:w-1/2 cursor-pointer overflow-hidden rounded-lg mb-4 md:mb-0'>
      <Image src={img} alt={title} className='w-full h-auto'/>
      </Link>
      <div className='w-full md:w-1/2 flex flex-col items-start justify-between pl-0 md:pl-6'>
        <span className='text-primary font-medium text-lg md:text-xl'>{type}</span>
        <Link href={link} target='_blank' className='hover:underline underline-offset-2'>
        <h2 className='my-2 w-full text-left text-2xl md:text-4xl font-bold'>{title}</h2>
      </Link>
      <p className='my-2 font-medium text-dark'>{summary}</p>
      <div className='mt-2 flex items-center'>
        <Link href={github} target='_blank' className='w-8 md:w-10'> <GithubIcon/> </Link>
        <Link href={link} target='_blank'
        className='ml-4 rounded-lg bg-dark text-light p-2 px-4 md:px-6 text-base md:text-lg font-semibold hover:text-primary'
        >Visit Project</Link>
      </div>
      </div>
    </article>
  )
}

const Projects = () => {
  return (
    <>
    <Head>
      <title>CODEwithESE | Projects Page</title>
      <meta name='description' content='A showcase of my latest projects'/>
    </Head>
    <main className='w-full mb-16 flex flex-col items-center justify-center'>
      <Layout className='pt-16'>
      <AnimatedText text='Imagination Trumps Knowledge!'
      className='mb-16'/>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12'>
        <div className='col-span-1'>
          <FeaturedProject
          title='Crypto Screener Application'
          img={project1}
          summary='A feature-rich Crypto Screener App using React, Tailwind CSS, context API and React Router. It shows detail regarding almost all the cryptocurrencies. You can easily convert the price...'
          link='/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
        <div className='col-span-1'>
          <FeaturedProject
          title='Sella Website'
          img={project2}
          summary='A Multi-Vendor Ecommerce Store to seamlessly connect with Clients and Businesses'
          link='https://sales-sella.vercel.app/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
        <div className='col-span-1'>
          <FeaturedProject
          title='Ifeoluwa Portfolio Website'
          img={project3}
          summary='A Professional Portfolio Website for my Client to showcase her Tailoring Skills and Baking Expertise '
          link='https://ifeoluwa-portfolio-khaki.vercel.app/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
        <div className='col-span-1'>
          <FeaturedProject
          title='CODEwithESE'
          img={project4}
          summary='A professional portfolio website using React JS, Framer-motion, and Styled-components. It has smooth page transitions, cool background effects, unique design and it is mobile responsive...'
          link='https://eseoghenethedeveloper.vercel.app/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
        <div className='col-span-1'>
          <FeaturedProject
          title='Citi-View Website'
          img={project5}
          summary='An Hotel Website for Bookings and Reservations'
          link='https://bookhotelng.vercel.app/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
        <div className='col-span-1'>
          <FeaturedProject
          title='SchoolBOOKS Website'
          img={project6}
          summary='A sleek Multi-Vendor Ecommerce Website'
          link='/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
        <div className='col-span-1'>
          <FeaturedProject
          title='Fashion Studio Website'
          img={project7}
          summary='A Sleek Fashion Studio Website'
          link='/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
  <div className='col-span-1'>
          <FeaturedProject
          title='Influencer Website'
          img={project8}
          summary='A influencer book Website'
          link='https://idyllic-dusk-052ce1.netlify.app/'
          github='github.com/eseoghene94'
          type='Featured Project'
          />
        </div>
      </div>
      </Layout>
    </main>
    </>
  )
}

export default Projects
