import express, {Request, Response, Router} from 'express';

export const threads: Router = express.Router();

threads.get('/message', (req: Request, res: Response) => {
    res.send('Hello  dear');
})
