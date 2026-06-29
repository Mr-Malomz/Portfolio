import Link from 'next/link';
import { Header } from '@/components/Header';

const EMAIL = 'hello@demolamalomo.xyz';

const SOCIAL: [string, string][] = [
	['Behance', 'https://www.behance.net/ademolamalomo'],
	['LinkedIn', 'https://www.linkedin.com/in/malomoademola/'],
	['GitHub', 'https://github.com/Mr-Malomz'],
	['Blog', 'https://dev.to/malomz'],
];

const BIO = [
	"I'm a software engineer based in Lagos, Nigeria. I build developer platforms, cloud infrastructure, and the systems that help engineering teams move faster.",
	"My work spans Rust, Kubernetes, and AWS. I design and operate production systems — from containerized backends and gRPC services to Kubernetes clusters and the networking, ingress, and deployment challenges that come with running them at scale.",
	"I've built products like DockAdmin, a Docker-native database administration platform written in Rust and shipped as a lightweight container image supporting PostgreSQL, MySQL, and SQLite — and Bimi, a financial search engine built on more than 20 million Nigerian fiscal records.",
	"What sets me apart is the ability to bridge platform engineering and developer experience. I don't just build the infrastructure; I write the documentation, onboarding flows, SDK experiences, and technical content that help other developers become productive on it quickly.",
	"I'm a contributor to the open-source SautiDB-Naija speech corpus, an Appwrite Hero, and the founder of FullstackWriter.dev, where I write about Rust, Kubernetes, cloud infrastructure, and developer tooling.",
];

export default function Home() {
	return (
		<div className='sw-page--editorial'>
			<Header />

			<section className='sw-about'>
				<div className='sw-about-label'>
					<div className='sw-eyebrow'>About</div>
				</div>
				<div className='sw-about-main'>
					<h1 className='sw-aboutname'>Demola Malomo</h1>
					<div className='sw-bio-body'>
						{BIO.map((p, i) => (
							<p key={i} className={i === 0 ? 'sw-bio-lead' : ''}>
								{p}
							</p>
						))}
					</div>
				</div>
			</section>

			<section className='sw-block sw-block--cta'>
				<Link className='sw-worklink' href='/projects'>
					<span className='sw-worklink-eye'>Selected Projects</span>
					<span className='sw-worklink-meta'>DockAdmin · Bimi · &amp; more</span>
					<span className='sw-worklink-main'>
						See what I&apos;ve built<i> →</i>
					</span>
				</Link>
			</section>

			<footer className='sw-contact'>
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
