import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// Wrap the NextAuth handler so we can surface a clearer error when the
// NEXTAUTH_SECRET is missing in production. NextAuth throws a generic
// MissingSecretError which appears as a 500; this wrapper returns a more
// actionable message to make debugging logs easier.
async function handleWithSecretCheck(req: Request) {
	const isProd = process.env.NODE_ENV === 'production';
	if (isProd && !process.env.NEXTAUTH_SECRET) {
		// Return a helpful 500 response instead of letting NextAuth throw.
		return new Response(
			'NextAuth configuration error: NEXTAUTH_SECRET is not set in production. Please set NEXTAUTH_SECRET in your environment.',
			{ status: 500 }
		);
	}

	// Delegate to NextAuth handler
	// `handler` is callable with the Request object in App Router.
	return handler(req as any);
}

export async function GET(req: Request) {
	return handleWithSecretCheck(req);
}

export async function POST(req: Request) {
	return handleWithSecretCheck(req);
}