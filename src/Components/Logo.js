import Link from 'next/link';
import React from 'react';

// Hovering cycles the mark through the original colour sequence (see the
// `logo-cycle` keyframes in globals.css).
const Logo = () => {
  return (
    <div className="flex items-center justify-center mt-2">
      <Link
        href="/"
        aria-label="Home"
        className="logo-mark w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-dark text-light flex items-center justify-center rounded-full text-lg sm:text-xl md:text-2xl font-bold"
      >
        ESE
      </Link>
    </div>
  );
};

export default Logo;
