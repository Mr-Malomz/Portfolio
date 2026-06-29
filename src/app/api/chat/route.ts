import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a helpful assistant on Demola Malomo's portfolio website. Answer questions about Demola's work, skills, and experience. Be concise, warm, and direct — no filler phrases.

About Demola:
- Software engineer based in Lagos, Nigeria
- Builds developer platforms, cloud infrastructure, and systems that help engineering teams move faster
- Works with Rust, Kubernetes, AWS, Docker, gRPC
- Built DockAdmin: a Docker-native database administration platform written in Rust, supporting PostgreSQL, MySQL, and SQLite
- Built Bimi: a financial search engine on 20M+ Nigerian fiscal records
- Founder of FullstackWriter.dev — a platform for developers to build technical writing portfolios
- Appwrite Hero and contributor to SautiDB-Naija (open-source Nigerian speech corpus)
- Bridges platform engineering and developer experience: infrastructure, docs, SDKs, onboarding
- Email: hello@demolamalomo.xyz

If asked how to hire or contact Demola, direct them to hello@demolamalomo.xyz. Keep responses under 150 words unless the question genuinely needs more depth.`;

export async function POST(req: NextRequest) {
	if (!process.env.GEMINI_API_KEY) {
		return NextResponse.json(
			{ error: 'AI not configured — add GEMINI_API_KEY to .env.local' },
			{ status: 503 }
		);
	}

	try {
		const { message, history } = await req.json();

		const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

		// Interactions API uses step_list format for multi-turn.
		// Single-turn (no history) can be a plain string.
		type TextStep = {
			type: 'user_input' | 'model_output';
			content: { type: 'text'; text: string }[];
		};

		const priorSteps: TextStep[] = (history ?? []).map(
			(m: { role: string; parts: { text: string }[] }) => ({
				type: m.role === 'user' ? 'user_input' : 'model_output',
				content: [{ type: 'text', text: m.parts[0]?.text ?? '' }],
			})
		);

		const input: string | TextStep[] = priorSteps.length
			? [...priorSteps, { type: 'user_input', content: [{ type: 'text', text: message }] }]
			: message;

		const interaction = await ai.interactions.create({
			model: 'gemini-3.5-flash',
			input,
			system_instruction: SYSTEM_PROMPT,
			generation_config: { max_output_tokens: 300 },
		});

		const text = interaction.output_text;
		if (!text) throw new Error('Empty response from model');

		return NextResponse.json({ text });
	} catch (err) {
		console.error('[/api/chat]', err);
		return NextResponse.json({ error: 'Request failed' }, { status: 500 });
	}
}
