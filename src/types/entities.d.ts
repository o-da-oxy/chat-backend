export interface IMessage {
  date: string;
  time: string;
  content: string;
  to: string;
  authorId: number;
}

export interface IRoom {
  name: string;
  roles: string[];
  description: string;
}
