import { Request, Response } from 'express';
import roomsData from '../../roomsDataset/rooms.json';
import { IRoom } from '../types/entities';

export async function getRoomNamesController(req: Request, res: Response) {
  try {
    const rooms = roomsData.map((room: IRoom) => room.name);
    res.json(rooms);
  } catch (error) {
    console.error('Error reading rooms.json:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoomsRolesController(req: Request, res: Response) {
  try {
    const nameRolesPairs = roomsData.reduce(
      (acc: { [name: string]: string[] }, room: IRoom) => {
        const { name, roles } = room;
        acc[name] = acc[name] || [];
        acc[name].push(...roles);
        return acc;
      },
      {}
    );
    const result = Object.entries(nameRolesPairs).map(([name, roles]) => ({
      name,
      roles,
    }));
    res.json(result);
  } catch (error) {
    console.error('Error reading rooms.json:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoomsDescriptionsController(
  req: Request,
  res: Response
) {
  try {
    const roomsInfo: { name: string; description: string }[] = roomsData.map(
      (room: { name: string; roles: string[]; description: string }) => {
        const { name, description } = room;
        return { name, description };
      }
    );
    res.json(roomsInfo);
  } catch (error) {
    console.error('Error reading rooms.json:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
