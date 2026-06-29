'use client';
import { useRef, useState } from 'react';
import { Header } from '@/components/Header';

interface Message {
	role: 'user' | 'model';
	text: string;
}

const CHIPS = [
	"What have you built?",
	"Tell me about DockAdmin",
	"What's your tech stack?",
	"How do I get in touch?",
];

export default function AiPage() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const threadRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const scrollToBottom = () => {
		setTimeout(() => {
			threadRef.current?.scrollTo({
				top: threadRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}, 50);
	};

	const send = async (text: string) => {
		if (!text.trim() || loading) return;

		const userMsg: Message = { role: 'user', text: text.trim() };
		const next = [...messages, userMsg];
		setMessages(next);
		setInput('');
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
		}
		setLoading(true);
		scrollToBottom();

		try {
			const history = next.slice(0, -1).map((m) => ({
				role: m.role,
				parts: [{ text: m.text }],
			}));

			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: userMsg.text, history }),
			});

			const { text: reply, error } = await res.json();
			setMessages([...next, { role: 'model', text: error ? 'Sorry, something went wrong. Try again.' : reply }]);
		} catch {
			setMessages([...next, { role: 'model', text: 'Sorry, something went wrong. Try again.' }]);
		} finally {
			setLoading(false);
			scrollToBottom();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send(input);
		}
	};

	const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInput(e.target.value);
		e.target.style.height = 'auto';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	return (
		<div className='sw-page--ai'>
			<Header />

			<div className='sw-ai-inner'>
				<div className='sw-ai-hero'>
					<h1>Ask AI</h1>
					<p>
						Ask anything about my work, skills, or how we might collaborate.
					</p>
					{messages.length === 0 && (
						<div className='sw-ai-suggest'>
							{CHIPS.map((chip) => (
								<button
									key={chip}
									className='sw-ai-chip'
									onClick={() => send(chip)}
									disabled={loading}
								>
									{chip}
								</button>
							))}
						</div>
					)}
				</div>

				{messages.length > 0 && (
					<div className='sw-ai-thread' ref={threadRef}>
						{messages.map((msg, i) => (
							<div
								key={i}
								className={`sw-ai-msg${msg.role === 'user' ? ' sw-ai-msg--user' : ''}`}
							>
								<div className='sw-ai-role'>
									{msg.role === 'user' ? 'You' : 'Demola AI'}
								</div>
								<div className='sw-ai-text'>{msg.text}</div>
							</div>
						))}
						{loading && (
							<div className='sw-ai-msg'>
								<div className='sw-ai-role'>Demola AI</div>
								<div className='sw-ai-typing'>
									<i /><i /><i />
								</div>
							</div>
						)}
					</div>
				)}

				<form
					className='sw-ai-form'
					onSubmit={(e) => { e.preventDefault(); send(input); }}
				>
					<textarea
						ref={textareaRef}
						className='sw-ai-input'
						rows={1}
						placeholder='Ask me anything…'
						value={input}
						onChange={handleInput}
						onKeyDown={handleKeyDown}
						disabled={loading}
					/>
					<button
						type='submit'
						className='sw-ai-send'
						disabled={!input.trim() || loading}
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
