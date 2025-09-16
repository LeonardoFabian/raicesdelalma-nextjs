// nextauth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultSession, DefaultUser } from "auth";


interface IUser extends DefaultUser {
  /**
   * Roles del usuario
   */
  role?: string;
//   isActive?: boolean;
  /**
   * Agregar cualquier otro campo que tu manejas
   */
}

declare module "next-auth" {
  interface User extends IUser {}

  interface Session {
    user: User;
  } // & DefaultSession['user'];
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
