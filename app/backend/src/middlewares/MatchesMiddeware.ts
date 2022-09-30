import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class MatchesMiddleware {
  public matchValidation = (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  };
}
