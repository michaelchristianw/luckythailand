import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/generated/prisma";

const createPrismaClient = () => new PrismaClient().$extends(withAccelerate());
type PrismaClientWithAccelerate = ReturnType<typeof createPrismaClient>;

const globalForPrisma = global as unknown as {
  prisma?: PrismaClientWithAccelerate;
};

const getPrismaClient = () => {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
};

const prisma = new Proxy({} as PrismaClientWithAccelerate, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = Reflect.get(client, prop);

    return typeof value === "function" ? value.bind(client) : value;
  },
});

export default prisma;
