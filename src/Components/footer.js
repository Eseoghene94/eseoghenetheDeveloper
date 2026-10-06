import Link from 'next/link';
import React from 'react';
import Layout from './Layout';
import { profile } from '@/data/profile';

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-solid border-dark font-medium text-base sm:text-lg px-4 sm:px-8 md:px-16 lg:px-32">
      <Layout className="py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <span className="mb-2 md:mb-0">
          {new Date().getFullYear()} &copy; {profile.shortName}. All Rights Reserved.
        </span>

        <div className="flex items-center justify-center mb-2 md:mb-0">
          Built with <span className="text-primary text-xl px-1" aria-label="love">&#9825;</span>
          by&nbsp;
          <Link href={profile.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            {profile.handle}
          </Link>
        </div>

        <Link href={`mailto:${profile.email}`} className="underline underline-offset-2">
          Say Hello!
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
