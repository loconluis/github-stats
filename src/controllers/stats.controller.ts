import { NextFunction, Request, Response } from 'express';
import { GithubService } from '../services/github.service';
import { setCache, getCache, hasCache } from '../utils/cache';
import { UserStats } from '../interfaces';

export class StatsController {
  githubService: GithubService;

  constructor() {
    this.githubService = new GithubService();
  }

  public async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      let user: string = req.params.username as string;
      if (!user) {
        res.status(404).json({ message: 'Param "username" is required' });
      }

      if (hasCache(user)) {
        const _data = getCache<UserStats>(user);
        res.status(200).send(_data);
      }
      let stats = await this.githubService.getUsersStats(user);
      setCache(user, stats);
      res.status(200).send(stats);
    } catch (error) {
      next(error);
    }
  }

  public async getMultipleStats(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const params = req.query;
      const users = params.users as string;

      if (!users || typeof users !== 'string') {
        res.status(404).json({ message: 'query param "users" is required' });
      }

      const userNameArr: string[] = users?.split(',');
      const usersStats: Record<string, UserStats> = {};
      const rs = await Promise.all(
        userNameArr.map((username) =>
          this.githubService.getUsersStats(username)
        )
      );
      userNameArr.map((user, index) => {
        usersStats[user] = rs[index];
      });
      res.status(200).send(usersStats);
    } catch (error) {
      next(error);
    }
  }
}
export default new StatsController();
