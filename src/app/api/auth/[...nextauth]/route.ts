import { authOptions } from '@/service/AuthOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
