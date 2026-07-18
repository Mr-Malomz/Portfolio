import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful assistant on Demola Malomo's portfolio website. Answer questions about Demola's work, skills, and experience. Be concise, warm, and direct — no filler phrases.

About Demola:
- Software engineer and platform experience engineer
- Builds developer platforms, cloud infrastructure, and systems that help engineering teams move faster
- Works with Rust, Kubernetes, AWS, Docker, gRPC
- Built DockAdmin: a Docker-native database administration platform written in Rust, supporting PostgreSQL, MySQL, and SQLite
- Built Bimi: a financial search engine on 20M+ Nigerian fiscal records
- Built File: A cross-platform, command-line file synchronization tool written in Rust.
- Founder of FullstackWriter.dev — a platform for developers to build technical writing portfolios
- Appwrite Hero and contributor to SautiDB-Naija (open-source Nigerian speech corpus)
- Bridges platform engineering and developer experience: infrastructure, docs, SDKs, onboarding
- Email: demola.malomo@gmail.com

If asked how to hire or contact Demola, direct them to demola.malomo@gmail.com. Keep responses under 150 words unless the question genuinely needs more depth. Do not use em dashes (—) in any response; use a comma, period, or rewrite the sentence instead.`;

export async function POST(req: NextRequest) {
	if (!process.env.GROQ_API_KEY) {
		return NextResponse.json(
			{ error: 'AI not configured — add GROQ_API_KEY to .env.local' },
			{ status: 503 }
		);
	}

	try {
		const { message, history } = await req.json();

		const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

		// Map prior turns to OpenAI-compatible format ('model' → 'assistant')
		const priorMessages = (history ?? []).map(
			(m: { role: string; parts: { text: string }[] }) => ({
				role: m.role === 'model' ? 'assistant' : 'user',
				content: m.parts[0]?.text ?? '',
			})
		);

		const completion = await groq.chat.completions.create({
			model: 'llama-3.3-70b-versatile',
			messages: [
				{ role: 'system', content: SYSTEM_PROMPT },
				...priorMessages,
				{ role: 'user', content: message },
			],
			max_tokens: 300,
			temperature: 0.7,
		});

		const text = completion.choices[0]?.message?.content;
		if (!text) throw new Error('Empty response from model');

		return NextResponse.json({ text });
	} catch (err) {
		console.error('[/api/chat]', err);
		return NextResponse.json({ error: 'Request failed' }, { status: 500 });
	}
}
