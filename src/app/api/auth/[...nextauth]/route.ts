import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { signInWithCredentials } from "@/auth/actions/auth-actions";
import { handlers } from "@/auth.config";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma) as Adapter,

//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // `credentials` is used to generate a form on the sign in page.
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "account@email.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         const user = await signInWithCredentials(
//           credentials?.email,
//           credentials?.password
//         );

//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         }

//         return null;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),

//     // ...add more providers here
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       // console.log({ user });
//       return true;
//     },

//     async jwt({ token, user, account, profile }) {
//       // console.log({ token });

//       const dbUser = await prisma.user.findUnique({
//         where: { email: token.email ?? "no-email" },
//       });

//       if (dbUser?.isActive === false) throw new Error("Inactive user");

//       token.roles = dbUser?.roles ?? ["no-roles"];
//       token.id = dbUser?.id ?? "no-uuid";
//       // token.isActive = dbUser?.isActive ?? false;

//       return token;
//     },

//     async session({ session, token, user }) {
//       if (session && session.user) {
//         session.user.roles = token.roles;
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions)

// Behind the MdScreenSearchDesktop, this creates all the relevant OAuth API routes within /api/auth/*

// GET /api/auth/signin
// POST /api/auth/signin/:provider
// GET/POST /api/auth/callback/:provider
// GET /api/auth/signout
// POST /api/auth/signout
// GET /api/auth/session
// GET /api/auth/csrf
// GET /api/auth/providers

// const handler = NextAuth(authOptions);

export const {  GET, POST} = handlers;
