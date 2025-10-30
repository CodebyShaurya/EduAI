import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

// Export the handler directly. Wrapping the handler can change the
// runtime shape expected by next-auth (it expects certain request/query
// shapes). To keep behavior identical to NextAuth docs, export the
// handler as-is so NextAuth receives the native request object.
export { handler as GET, handler as POST };