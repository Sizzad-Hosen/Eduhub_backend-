import { Request, Response } from 'express';


export const findOrCreateChat = async (req: Request, res: Response) => {
  try {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) {
      return res.status(400).json({ error: 'userId1 and userId2 are required' });
    }

    const chat = await chatService.findOrCreateChat(userId1, userId2);
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const chats = await chatService.getUserChats(userId);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
