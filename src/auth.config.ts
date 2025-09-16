import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
 
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register',
    },

    callbacks: {
       
        authorized({ auth, request: { nextUrl } }) {
            // console.log({ auth });

            // const isLoggedIn = !!auth?.user;
            // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/dashboard', nextUrl));
            // }
            return true;
        },

        jwt({ token, user}) {
            // console.log({ token, user });
            if (user) {
                token.data = user;
            }
            return token;
        },

        session({ session, token, user }) {
            // console.log({ session, token, user });
            session.user = token.data as any;
            return session;
        },
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.email(), password: z.string().min(6) })
                .safeParse(credentials);

                // console.log('ParseCredentials Success:', parsedCredentials.success);

                if (!parsedCredentials.success) throw new Error('Invalid data entered.');

                const { email, password } = parsedCredentials.data;
                // console.log('AuthConfig.ts');
                // console.log({ email, password });

                // search email
                const user = await prisma?.user.findUnique({ where: { email: email.toLowerCase() } });
                if (!user) throw new Error('User not found.');

                // compare password
                if (!bcryptjs.compareSync( password, user.password )) throw new Error('Invalid password.');

                // return user

                const { password: _password, ...rest } = user;
                // console.log({ rest });

                return rest; 
            },
        }),
    ]
} 


export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
// export const { signIn, signOut, auth: middleware } = NextAuth(authConfig);