import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category1 = await prisma.category.upsert({
    where: { name: 'Orchids' },
    update: {},
    create: {
      name: 'Orchids',
      description:
        'Orchids are a diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant.',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { name: 'Succulents' },
    update: {},
    create: {
      name: 'Succulents',
      description:
        'Succulents are plants that store water in their leaves, stems, and roots.',
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
