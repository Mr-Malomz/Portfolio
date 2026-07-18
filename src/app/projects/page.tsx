import { Header } from '@/components/Header';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apolloClient';
import Link from 'next/link';

const EMAIL = 'demola.malomo@gmail.com';

const SOCIAL: [string, string][] = [
	['Behance', 'https://www.behance.net/ademolamalomo'],
	['LinkedIn', 'https://www.linkedin.com/in/malomoademola/'],
	['GitHub', 'https://github.com/Mr-Malomz'],
	['Blog', 'https://dev.to/malomz'],
];

interface ProjectLink {
	label: string;
	url: string;
}

interface IProject {
	id: string;
	name: string;
	kind: string;
	description: string;
	tags: string[];
	links: ProjectLink[];
}

const PROJECTS_QUERY = gql`
	query {
		projects {
			id
			name
			kind
			description
			tags
			links {
				label
				url
			}
		}
	}
`;

export default async function Projects() {
	const { error, data } = await getClient().query({ query: PROJECTS_QUERY });

	if (error) {
		return (
			<div className='sw-page--projects'>
				<Header />
				<p style={{ marginTop: '80px', color: 'var(--dim)', fontSize: '16px' }}>
					Something went wrong.{' '}
					<Link href='mailto:demlabz@gmail.com' style={{ color: 'var(--accent)' }}>
						Let Demola know →
					</Link>
				</p>
			</div>
		);
	}

	const projects: IProject[] = data?.projects ?? [];

	return (
		<div className='sw-page--projects'>
			<Header />

			<section className='sw-work-hero'>
				<div>
					<div className='sw-eyebrow'>
						{projects.length > 0
							? `${projects.length} projects · built & collaborated`
							: 'Projects'}
					</div>
					<h1>Projects</h1>
				</div>
				<p>
					Selected projects spanning developer platforms, cloud
					infrastructure, open source, and developer experience.
					Explore the code, live projects, and technical write-ups
					behind each one.
				</p>
			</section>

			<section className='sw-proj-grid'>
				{projects.map((project, i) => (
					<article className='sw-proj' key={project.id}>
						<div className='sw-proj-top'>
							<span className='sw-proj-num'>
								{String(i + 1).padStart(2, '0')}
							</span>
						</div>
						<div className='sw-proj-kind'>{project.kind}</div>
						<h2 className='sw-proj-name'>{project.name}</h2>
						<p className='sw-proj-desc'>{project.description}</p>
						{project.tags?.length > 0 && (
							<div className='sw-tl-tags'>
								{project.tags.map((tag) => (
									<span className='sw-tl-tag' key={tag}>
										{tag}
									</span>
								))}
							</div>
						)}
						{project.links?.length > 0 && (
							<div className='sw-proj-links'>
								{project.links.map((link) =>
									link.url ? (
										<a
											className='sw-proj-link'
											href={link.url}
											target='_blank'
											rel='noreferrer'
											key={link.label}
										>
											{link.label}
											<i>↗</i>
										</a>
									) : (
										<span
											className='sw-proj-link'
											key={link.label}
											style={{ color: 'var(--dim)' }}
										>
											{link.label}
										</span>
									),
								)}
							</div>
						)}
					</article>
				))}
			</section>

			<footer
				className='sw-contact'
				style={{ marginTop: '64px', paddingTop: '40px' }}
			>
				<div className='sw-contact-l'>
					<div className='sw-eyebrow'>Contact</div>
					<Link
						className='sw-email'
						href={`mailto:${EMAIL}`}
					>
						{EMAIL}
					</Link>
				</div>
				<nav className='sw-social'>
					{SOCIAL.map(([label, href]) => (
						<a
							key={label}
							href={href}
							target='_blank'
							rel='noreferrer'
						>
							{label}
							<i> ↗</i>
						</a>
					))}
				</nav>
			</footer>
		</div>
	);
}
