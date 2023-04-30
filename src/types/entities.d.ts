export interface IMessage {
  id: number;
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
