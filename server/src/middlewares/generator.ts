import { Request, Response, NextFunction } from 'express';
import { bicycleHealthAlgorithm } from '../utilities/bicycleHealth.algorithm';

const generator = async (req: Request, res: Response, next: NextFunction) => {
  await bicycleHealthAlgorithm();
  next();
};

export { generator };
