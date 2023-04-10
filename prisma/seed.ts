import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'admin@mail.ru',
      name: 'Admin',
      password: 'admin',
    },
  });
  const date = new Date();
  const message = await prisma.message.create({
    data: {
      content: 'Hi!',
      authorId: user.id,
      socketId: '123',
      date: date.toLocaleString(),
      to: 'Group1',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
