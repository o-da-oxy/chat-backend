import { Request, Response } from 'express';

export async function getRoomNamesController(req: Request, res: Response) {
  try {
    const { db } = req.context;
    const rooms = await db.room.findMany({ select: { name: true } });
    const roomNames = rooms.map(room => room.name);
    res.json(roomNames);
  } catch (error) {
    console.error('Error retrieving room names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoomsRolesController(req: Request, res: Response) {
  try {
    const { db } = req.context;
    const rooms = await db.room.findMany({
      select: { name: true, roles: true },
    });
    const nameRolesPairs = rooms.reduce((acc: Record<string, any>, room) => {
      const { name, roles } = room;
      acc[name] = acc[name] || [];
      acc[name].push(...roles);
      return acc;
    }, {});
    const result = Object.entries(nameRolesPairs).map(([name, roles]) => ({
      name,
      roles,
    }));
    res.json(result);
  } catch (error) {
    console.error('Error retrieving room roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getRoomsDescriptionsController(
  req: Request,
  res: Response
) {
  try {
    const { db } = req.context;
    const rooms = await db.room.findMany({
      select: { name: true, description: true },
    });
    const roomsInfo = rooms.map(room => ({
      name: room.name,
      description: room.description,
    }));
    res.json(roomsInfo);
  } catch (error) {
    console.error('Error retrieving room descriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
