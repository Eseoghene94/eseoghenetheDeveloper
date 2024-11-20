import React from 'react';

const Layout = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light 
                  p-4 sm:p-8 md:p-16 lg:p-24 xl:p-32 
                  ${className}`}
    >
      {children}
    </div>
  );
};

export default Layout;


// import React from 'react'

// const layout = ({children, className=' '}) => {
//   return (
//     <div className={`w-full h-full inline-block z-0 bg-light p-32 ${className}`}>
//         {children}
//         </div>
//   )
// }

// export default layout