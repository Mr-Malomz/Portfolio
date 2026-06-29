'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
	{ label: 'About', href: '/' },
	{ label: 'Work', href: '/work' },
	{ label: 'Projects', href: '/projects' },
	{ label: 'Ask AI', href: '/ai' },
];

export const Header = () => {
	const pathname = usePathname();
	return (
		<header className='sw-mast'>
			<Link className='sw-name' href='/'>
				Demola Malomo
			</Link>
			<div className='sw-nav'>
				<span className='sw-nav-tag'>Software Engineer · Platforms &amp; DX</span>
				<nav className='sw-nav-links'>
					{NAV.map(({ label, href }) => (
						<Link
							key={href}
							href={href}
							className={`sw-nav-link${pathname === href ? ' on' : ''}`}
						>
							{label}
						</Link>
					))}
				</nav>
			</div>
		</header>
	);
};
