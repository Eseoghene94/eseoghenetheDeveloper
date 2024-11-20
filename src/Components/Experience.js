import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LineIcon from './LineIcon';

const Details = ({ position, company, companyLink, time, address, work }) => {
    return (
        <li className='my-8 first:mt-0 last:mb-0 w-full sm:w-[80%] lg:w-[60%] mx-auto flex flex-col sm:flex-row sm:items-start sm:justify-between'>
            <LineIcon />
            <div className='sm:ml-4'>
                <h3 className='capitalize font-bold text-2xl'>
                    {position}&nbsp;
                    <a
                        href={companyLink}
                        target='_blank'
                        className='text-red-600 capitalize'>
                        @{company}
                    </a>
                </h3>
                <span className='capitalize font-medium text-dark/75'>
                    {time} | {address}
                </span>
                <p className='font-medium'>
                    {work}
                </p>
            </div>
        </li>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll(
        {
            target: ref,
            offset: ['start end', 'center start']
        }
    );

    return (
        <div className='my-64'>
            <h2 className='font-bold text-8xl mb-32 w-full text-center'>
                Experience
            </h2>
            <div ref={ref} className='w-full sm:w-[85%] lg:w-[75%] mx-auto relative'>
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className='absolute left-8 top-0 w-[4px] h-full bg-dark origin-top' />
                <ul className='w-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-between ml-4'>
                    <Details
                        position='Senior Frontend Developer' company='NodeTent'
                        companyLink='https://www.nodetent.com'
                        time='2024-Present'
                        address='Lekki, Lagos'
                        work='Headed a team responsible for developing new features for top Nigerian Brands to help elevate their UI.'
                    />
                    <Details
                        position='Frontend Developer' company='GoMyCODE'
                        companyLink='https://www.gomycode.com'
                        time='2022-2023'
                        address='Ikeja, Lagos'
                        work='Tutored learners extensively on frontend technologies with thorough brush up on HTML, CSS and JavaScript.'
                    />
                    <Details
                        position='Frontend Developer' company='CODEwithESE'
                        companyLink='https://www.codewithese.com'
                        time='2022'
                        address='Lekki, Lagos'
                        work='Freelance Frontend developer developing responsive and smart user friendly interfaces for brands.'
                    />
                    <Details
                        position='Junior Frontend Developer' company='HugoTech'
                        companyLink='https://www.hugo.com'
                        time='2021-2022'
                        address='Lekki, Lagos'
                        work='Worked skillfully with a team responsible for developing new features for top of Nigerian Brands to help elevate their UI.'
                    />
                </ul>
            </div>
        </div>
    )
}

export default Experience;



// import React, { useRef } from 'react'
// import { motion, useScroll } from 'framer-motion'
// import LineIcon from './LineIcon';


// const Details =({position, company, companyLink, time, address, work}) => {
//     return (
//     <li className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between'>
        
//         <LineIcon />
//         <div>
//             <h3 className='capitalize font-bold text-2xl'>{position}&nbsp;<a href={companyLink}
//             target='_blank'
//             className='text-red-600 capitalize'
//             >@{company}</a></h3>
//             <span className='capitalize font-medium text-dark/75'>
//                 {time} | {address}
//                 </span>
//                 <p className='font-medium w-full'>
//                     {work}
//                 </p>
//         </div>
//     </li>
//     );
// };

// const Experience = () => {
//     const ref = useRef (null);
//     const {scrollYProgress} = useScroll(
//         {
//             target: ref,
//             offset: ['start end','center start']
//         }
//     )
//   return (
//     <div className='my-64'>
//         <h2 className='font-bold text-8xl mb-32 w-full text-center'>
//             Experience
//         </h2>
//         <div ref={ref} className='w-[75%] mx-auto relative'>
//             <motion.div 
//             style={{scaleY:scrollYProgress}}
//             className='absolute left-8 top-0 w-[4px] h-full bg-dark origin-top' />
//             <ul className='w-full flex flex-col items-start justify-between ml-4'>
//                 <Details
//                 position='Senior Frontend Developer' company='NodeTent'
//                 companyLink='www.nodetent.com'
//                 time='2024-Present' 
//                 address='Lekki, Lagos' 
//                 work='Headed a team responsible for developing new features for top Nigerian Brands to help elevate their UI.'
//                 />
//                 <Details
//                 position='Frontend Developer' company='GoMyCODE'
//                 companyLink='www.gomycode.com'
//                 time='2022-2023' 
//                 address='Ikeja, Lagos' 
//                 work='Tutored learners extensively on frontend technologies with thorough brush up on HTML, CSS and JavaScript.'
//                 />
//                 <Details
//                 position='Frontend Developer' company='CODEwithESE'
//                 companyLink='www.codewithese.com'
//                 time='2022' 
//                 address='Lekki, Lagos' 
//                 work='Freelance Frontend developer developing responsive and smart user friendly interfaces for brands.'
//                 />
//                 <Details
//                 position='Junior Frontend Developer' company='HugoTech'
//                 companyLink='www.Hugo.com'
//                 time='2021-2022' 
//                 address='Lekki, Lagos' 
//                 work='Worked skillfully with a team responsible for developing new features for top of Nigerian Brands to help elevate their UI.'
//                 />
//             </ul>
//         </div>
//         </div>
//   )
// }

// export default Experience