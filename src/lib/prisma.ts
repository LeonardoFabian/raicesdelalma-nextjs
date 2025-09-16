import { PrismaClient } from '@prisma/client';

/* -----------------------------------------
Create a connection to your Prisma Client
-------------------------------------------*/


// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!(global).prisma) {
//     (global).prisma = new PrismaClient();
//   }
//   prisma = (global).prisma;
// }

// export default prisma;



/* -----------------------------------------
Default prisma client
-----------------------------------------*/ 

// const prisma = new PrismaClient();



/* -----------------------------------------
Prisma Client (singleton)
-----------------------------------------*/

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// }

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClientSingleton | undefined };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


/* -----------------------------------------
Prisma Client (current)
------------------------------------------*/

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
