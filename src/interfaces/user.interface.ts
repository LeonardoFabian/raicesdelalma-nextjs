import { Address } from "./address.interface";

export interface IUser {
    id?: string | undefined;
    name?: string | null | undefined;
    role?: string | undefined;
    isActive?: boolean;
    email?: string | null | undefined;
    emailVerified?: Date | null;
    image?: string | null | undefined;
    // address?: Address | undefined;
    // Order?: any;
}