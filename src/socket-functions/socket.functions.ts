import { prisma } from '../index';
import { IMessage } from '../types/entities';

export async function groupMessagesByDate(messages: IMessage[]) {
  const groupsByDate = messages.reduce<{ [key: string]: IMessage[] }>(
    (result, message) => {
      if (result[message.date]) {
        result[message.date].push(message);
      } else {
        result[message.date] = [message];
      }
      return result;
    },
    {}
  );

  const groupedMessages = await Promise.all(
    Object.entries(groupsByDate).map(async ([date, messagesByDate]) => {
      const sortedMessages = messagesByDate.sort((a, b) => a.id - b.id);
      const messagesWithAuthors = await Promise.all(
        sortedMessages.map(async ({ time, content, to, authorId }) => {
          const author = await getAuthorById(authorId);
          return {
            time,
            content,
            to,
            author,
          };
        })
      );
      return {
        date,
        messagesByDate: messagesWithAuthors,
      };
    })
  );

  return groupedMessages;
}

export async function getLastMessagesFromRoom(room: string) {
  const roomMessages = await prisma.message.groupBy({
    by: ['date', 'time', 'content', 'to', 'authorId', 'id'],
    where: {
      to: room,
    },
    orderBy: {
      id: 'asc',
    },
    select: {
      date: true,
      time: true,
      content: true,
      to: true,
      authorId: true,
      id: true,
    } as never,
  });
  return roomMessages;
}

export async function getAuthorById(id: number) {
  const author = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return author;
}

export async function getUsers() {
  const author = await prisma.user.findMany();
  return author;
}
