import React from 'react'

const LineIcon = () => {
  return (
    <figure className='absolute left-0 stroke-dark'>
      <svg 
        width='75' 
        height='75' 
        viewBox='0 0 100 100' 
        className='w-[75px] h-[75px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px]'
      >
        <circle cx='75' cy='50' r='20' className='stroke-primary stroke-1 fill-none' />
        <circle cx='75' cy='50' r='20' className='stroke-[5px] fill-light'/>
        <circle cx='75' cy='50' r='10' className='stroke-1 fill-red-500'/>
      </svg>
    </figure>
  )
}

export default LineIcon



// import React from 'react'

// const LineIcon = () => {
//   return (
//     <figure className='absolute left-0 stroke-dark'>
//         <svg width='75' height='75' viewBox='0 0 100 100'>
//     <circle cx='75' cy='50' r='20' className='stroke-primary stroke-1 fill-none' />
//     <circle cx='75' cy='50' r='20' className=' stroke-[5px] fill-light'/>
//     <circle cx='75' cy='50' r='10' className='stroke-1 fill-red-500'/>
//         </svg>
//     </figure>
//   )
// }

// export default LineIcon