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

interface IWork {
	id: string;
	name: string;
	description: string;
	timeline: string[];
	role?: string;
	link?: string;
}

const SELECTED_WORK = gql`
	query MyQuery {
		works {
			workList {
				... on SelectedWork {
					id
					name
					description
					timeline
					role
					link
				}
			}
		}
	}
`;

function formatTimeline(timeline: string[]): string {
	if (!timeline?.length) return '—';
	if (timeline.length === 1) return `${timeline[0]} —`;
	return `${timeline[0]} — ${timeline[1]}`;
}

export default async function Work() {
	const { error, data } = await getClient().query({ query: SELECTED_WORK });

	if (error) {
		return (
			<div className='sw-page--work'>
				<Header />
				<p
					style={{
						marginTop: '80px',
						color: 'var(--dim)',
						fontSize: '16px',
					}}
				>
					Something went wrong.{' '}
					<Link
						href='mailto:demlabz@gmail.com'
						style={{ color: 'var(--accent)' }}
					>
						Let Demola know →
					</Link>
				</p>
			</div>
		);
	}

	const works: IWork[] = data?.works?.[0]?.workList ?? [];

	return (
		<div className='sw-page--work'>
			<Header />

			<section className='sw-work-hero'>
				<div>
					<div className='sw-eyebrow'>
						{works.length > 0
							? `${works.length} entries`
							: 'Experience'}
					</div>
					<h1>Work</h1>
				</div>
				<p>
					A chronological account of my experience across multiple
					organizations, spanning platform engineering, developer
					experience, developer advocacy, and cloud infrastructure.
				</p>
			</section>

			<section className='sw-timeline'>
				{works.map((work) => (
					<div className='sw-tl-row' key={work.id}>
						<div className='sw-tl-year'>
							{formatTimeline(work.timeline)}
						</div>
						<div className='sw-tl-body'>
							<div className='sw-tl-head'>
								{work.link ? (
									<Link
										className='sw-tl-name'
										href={work.link}
										target='_blank'
										rel='noreferrer'
									>
										{work.name}
									</Link>
								) : (
									<div className='sw-tl-name'>
										{work.name}
									</div>
								)}
								{/* role placeholder — add `role` field in Hygraph to replace */}
								<div className='sw-tl-role'>{work.role}</div>
							</div>
							<p className='sw-tl-desc'>{work.description}</p>
							{/* tags placeholder — add `tags` field in Hygraph to replace */}
						</div>
					</div>
				))}
			</section>

			<footer
				className='sw-contact'
				style={{ marginTop: '72px', paddingTop: '40px' }}
			>
				<div className='sw-contact-l'>
					<div className='sw-eyebrow'>Contact</div>
					<Link className='sw-email' href={`mailto:${EMAIL}`}>
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
