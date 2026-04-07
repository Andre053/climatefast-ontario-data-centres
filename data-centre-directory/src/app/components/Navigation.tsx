'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    {
      href: 'https://votingrecords.climatefast.ca/',
      label: 'Climate Voting Records'
    }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-y-2 py-3 sm:h-16 sm:py-0">
          <div className="flex items-center">
            <Link href="/" className="text-lg sm:text-xl font-bold whitespace-nowrap">
              Ontario Data Centres
            </Link>
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-0 sm:space-x-4">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  pathname === link.href ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
