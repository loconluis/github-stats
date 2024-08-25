import { Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { UserStats } from '../interfaces';

export const getStats = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  let user: string =
    (req.params.username as string) || (req.query.users as string);
  const gs = new GithubService();
  const userNameArr = user.split(',');

  if (userNameArr.length === 1) {
    let stats = await gs.getUsersStats(userNameArr[0]);
    res.status(200).send(stats);
  } else {
    const usersStats: Record<string, UserStats> = {};
    const rs = await Promise.all(
      userNameArr.map((username) => gs.getUsersStats(username))
    );

    userNameArr.map((user, index) => {
      console.log('user', user);
      usersStats[user] = rs[index];
    });
    res.status(200).send(usersStats);
  }
};
