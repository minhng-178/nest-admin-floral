import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category1 = await prisma.category.create({
    data: {
      name: 'Tulip',
      description: 'Tulip is a beautiful flower',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Rose',
      description: 'Rose is a beautiful flower',
    },
  });

  console.log({ category1, category2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
