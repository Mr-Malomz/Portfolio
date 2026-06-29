import type { Metadata } from 'next';
import { Arimo } from 'next/font/google';
import './globals.css';

const arimo = Arimo({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-arimo',
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Demola Malomo',
	description:
		"Software engineer building developer platforms, cloud infrastructure, and the systems that help engineering teams move faster.",
	keywords: 'Demola Malomo, Software Engineer, Rust, Kubernetes, Platforms, DX',
	openGraph: {
		title: 'Demola Malomo — Software Engineer · Platforms & DX',
		type: 'website',
		siteName: 'Demola Malomo',
		description:
			"Software engineer building developer platforms, cloud infrastructure, and the systems that help engineering teams move faster.",
		images: [
			{
				url: 'https://res.cloudinary.com/dtgbzmpca/image/upload/v1697725985/DemolaMalomz.png',
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${arimo.variable} sw`}>{children}</body>
		</html>
	);
}
