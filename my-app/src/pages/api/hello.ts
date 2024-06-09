// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export const b = function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

// export const a = function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "rashmi BARODIYA" });
// }

import express, { Request, Response } from 'express';
import next from 'next';

//const dev = process.env.NODE_ENV !== 'production';
//const app = next({ dev });
//const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

// app.prepare().then(() => {
  const server = express();

  server.get('/api/route1', (req: Request, res: Response) => {
    res.json({ message: 'This is route 1' });
  });

  server.get('/api/route2', (req: Request, res: Response) => {
    res.json({ message: 'This is route 2' });
  });

  // server.all('*', (req: Request, res: Response) => {
  //   return handle(req, res);
  // });

  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
//});

