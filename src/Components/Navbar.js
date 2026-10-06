import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { TwitterIcon, GithubIcon, LinkedInIcon } from './icons';
import { profile } from '@/data/profile';

const NAV_LINKS = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About' },
  { href: '/projects', title: 'Projects' },
];

const SOCIALS = [
  { href: profile.links.twitter, label: 'Twitter', Icon: TwitterIcon },
  { href: profile.links.github, label: 'GitHub', Icon: GithubIcon },
  { href: profile.links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
];

const isActive = (pathname, href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

const CustomLink = ({ href, title, className = '' }) => {
  const { pathname } = useRouter();
  const active = isActive(pathname, href);

  return (
    <Link href={href} className={`${className} relative group text-lg`} aria-current={active ? 'page' : undefined}>
      {title}
      <span
        aria-hidden="true"
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          active ? 'w-full' : 'w-0'
        }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Close the mobile menu after navigating.
  useEffect(() => {
    const close = () => setIsMenuOpen(false);
    router.events.on('routeChangeStart', close);
    return () => router.events.off('routeChangeStart', close);
  }, [router.events]);

  return (
    <header className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4 sm:py-6 md:py-8 font-medium flex items-center justify-between relative bg-light z-20">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Logo />
      </div>

      <button
        type="button"
        className="block md:hidden p-1"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="primary-nav"
      >
        <span className="block space-y-1">
          <span className={`block h-0.5 w-6 bg-dark transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block h-0.5 w-6 bg-dark transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-dark transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </span>
      </button>

      <nav
        id="primary-nav"
        aria-label="Primary"
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex items-center justify-center flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-light shadow-md md:shadow-none z-10 py-2 md:py-0`}
      >
        {NAV_LINKS.map((link, i) => (
          <CustomLink
            key={link.href}
            href={link.href}
            title={link.title}
            className={`py-2 md:py-0 ${i === 0 ? 'md:mr-4' : i === NAV_LINKS.length - 1 ? 'md:ml-4' : 'md:mx-4'}`}
          />
        ))}
      </nav>

      <nav aria-label="Social" className="flex items-center justify-center flex-wrap">
        {SOCIALS.map(({ href, label, Icon }, i) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`w-6 transition-transform duration-200 hover:-translate-y-1.5 active:scale-90 ${i === 0 ? 'mr-3' : 'mx-3'}`}
          >
            <Icon />
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
