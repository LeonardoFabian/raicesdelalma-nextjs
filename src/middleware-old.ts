import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // don't apply middleware on api routes, static files and images
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};