import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Startup-time environment validation: fail fast with a clear error when
// running in production without the required NextAuth secret. This avoids
// cryptic runtime stack traces later when NextAuth attempts to operate.
if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
  // Throwing here prevents the server from starting with a broken auth config.
  // The developer should set NEXTAUTH_SECRET in their hosting provider.
  throw new Error(
    'Missing required environment variable NEXTAUTH_SECRET. Set NEXTAUTH_SECRET in production (Vercel Environment Variables or similar).'
  );
}

export const authOptions: NextAuthOptions = {
  // Important: NextAuth requires a `secret` in production. Provide it via
  // the NEXTAUTH_SECRET environment variable (set in Vercel or your host).
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // session.user can be undefined in some typings; guard and cast to avoid TS error
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};