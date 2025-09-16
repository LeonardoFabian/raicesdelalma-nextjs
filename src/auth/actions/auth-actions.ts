/**
 * @deprecated
 */

// import { getServerSession } from "next-auth";
// import bcrypt from "bcryptjs";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import prisma from "@/lib/prisma";

// export const getServerSideUserSession = async () => {
//     const session = await getServerSession(authOptions);
//     return session?.user;
// }

// export const signInWithCredentials = async ( email?: string, password?: string ) => {
//     if ( !email || !password ) return null;
    
//     const user = await prisma?.user.findUnique({ where: { email } });

//     if (!user) {
//         const dbUser = await createUser(email, password);
//         return dbUser;
//     } else {
//         if ( !bcrypt.compareSync( password, user.password ?? '') ) {
//             return null;
//         } 
//     }

//     return user;
// }

// const createUser = async (email: string, password: string) => {
//     const user = await prisma?.user.create({
//         data: {
//             email: email, 
//             password: bcrypt.hashSync(password),
//             name: email.split('@')[0],
//         }
//     });

//     return user;
// }