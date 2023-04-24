import { Request, Response } from 'express';
const rooms = [
  'General',
  'Taxi',
  'Date',
  'Hotel',
  'Party',
  'Cafe',
  'Job interview',
];

export async function getAllRoomsController(req: Request, res: Response) {
  res.json(rooms);
}
