import { Header } from '@/components/Header';
import Link from 'next/link';

const EMAIL = 'hello@demolamalomo.xyz';

const SOCIAL: [string, string][] = [
	['Behance', 'https://www.behance.net/ademolamalomo'],
	['LinkedIn', 'https://www.linkedin.com/in/malomoademola/'],
	['GitHub', 'https://github.com/Mr-Malomz'],
	['Blog', 'https://dev.to/malomz'],
];

const PROJECTS = [
	{
		kind: 'Built',
		name: 'DockAdmin',
		year: '2024',
		desc: 'A Docker-native database administration platform written in Rust, shipped as a lightweight container image. Manage PostgreSQL, MySQL, and SQLite from a single place.',
		tags: ['Rust', 'Docker', 'Databases'],
		links: [
			['GitHub', '#'],
			['Write-up', '#'],
		] as [string, string][],
	},
	{
		kind: 'Built',
		name: 'Bimi',
		year: '2024',
		desc: 'A financial search engine built on more than 20 million Nigerian fiscal records — making public spending fast to search and explore.',
		tags: ['Rust', 'Search', 'Fintech'],
		links: [
			['Live', '#'],
			['GitHub', '#'],
		] as [string, string][],
	},
	{
		kind: 'Contributor',
		name: 'SautiDB-Naija',
		year: '2022',
		desc: 'An open-source, Nigerian-accented speech corpus for training and evaluating speech models — contributing data and tooling to the project.',
		tags: ['Open Source', 'Dataset', 'Speech'],
		links: [
			['GitHub', '#'],
			['Paper', '#'],
		] as [string, string][],
	},
	{
		kind: 'Founder',
		name: 'FullstackWriter.dev',
		year: '2023',
		desc: 'A publishing platform that helps developers build a body of technical writing — write, share, and grow a portfolio that compounds over time.',
		tags: ['Product', 'Platform', 'DX'],
		links: [
			['Live', '#'],
			['Articles', '#'],
		] as [string, string][],
	},
];

export default function Projects() {
	return (
		<div className='sw-page--projects'>
			<Header />

			<section className='sw-work-hero'>
				<div>
					<div className='sw-eyebrow'>
						{PROJECTS.length} projects · built &amp; collaborated
					</div>
					<h1>Projects</h1>
				</div>
				<p>
					Things I&apos;ve built or helped build — products, infrastructure, and
					open source. Each links out to the code, the live work, or a write-up.
				</p>
			</section>

			<section className='sw-proj-grid'>
				{PROJECTS.map((project, i) => (
					<article className='sw-proj' key={project.name}>
						<div className='sw-proj-top'>
							<span className='sw-proj-num'>
								{String(i + 1).padStart(2, '0')}
							</span>
							<span className='sw-proj-year'>{project.year}</span>
						</div>
						<div className='sw-proj-kind'>{project.kind}</div>
						<h2 className='sw-proj-name'>{project.name}</h2>
						<p className='sw-proj-desc'>{project.desc}</p>
						<div className='sw-tl-tags'>
							{project.tags.map((tag) => (
								<span className='sw-tl-tag' key={tag}>
									{tag}
								</span>
							))}
						</div>
						<div className='sw-proj-links'>
							{project.links.map(([label, href]) =>
								href !== '#' ? (
									<a
										className='sw-proj-link'
										href={href}
										target='_blank'
										rel='noreferrer'
										key={label}
									>
										{label}
										<i>↗</i>
									</a>
								) : (
									<span className='sw-proj-link' key={label} style={{ color: 'var(--dim)' }}>
										{label}
									</span>
								)
							)}
						</div>
					</article>
				))}
			</section>

			<footer
				className='sw-contact'
				style={{ marginTop: '64px', paddingTop: '40px' }}
			>
				<div className='sw-contact-l'>
					<div className='sw-eyebrow'>Contact</div>
					<Link className='sw-email' href={`mailto:${EMAIL}`}>
						{EMAIL}
					</Link>
				</div>
				<nav className='sw-social'>
					{SOCIAL.map(([label, href]) => (
						<a key={label} href={href} target='_blank' rel='noreferrer'>
							{label}
							<i> ↗</i>
						</a>
					))}
				</nav>
			</footer>
		</div>
	);
}
