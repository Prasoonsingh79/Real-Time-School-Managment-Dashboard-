// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// export default prisma;
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from '@prisma/client';
const PrismaClientSingleton=()=>{
  return new PrismaClient()
}

declare const globalThis:{
  prismaGlobal:ReturnType<typeof PrismaClientSingleton>;

}& typeof global;

const prisma = globalThis.prismaGlobal ??  PrismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== 'production') 
   globalThis.prismaGlobal = prisma;