import { prisma } from '../index';

// functions for socket in index.ts

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getLastMessagesFromRoom(room: string) {
  const roomMessages = await prisma.message.groupBy({
    by: ['date'],
    where: {
      to: room,
    },
    orderBy: {
      date: 'asc', // по возрастанию
    },
  });
  return roomMessages;
}

export function sortRoomMessagesByDate(messages: any[]) {
  // from the earliest to the latest
  return messages.sort((a, b) => {
    const date1 = a.date.split('/');
    const date2 = b.date.split('/');
    const dateString1 = `${date1[2]}${date1[0]}${date1[1]}`;
    const dateString2 = `${date2[2]}${date2[0]}${date2[1]}`;
    return dateString1 < dateString2 ? -1 : 1;
  });
}
