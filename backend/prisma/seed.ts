import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Add seed data here if needed
  // Example:
  // const user = await prisma.user.create({
  //   data: {
  //     clerkId: 'user_123',
  //     email: 'test@example.com',
  //     firstName: 'Test',
  //     lastName: 'User',
  //     role: 'STUDENT',
  //   },
  // });

  console.log('✅ Seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

