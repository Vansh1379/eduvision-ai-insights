import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.userRole?.toLowerCase();
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new AppError('Insufficient permissions', 403);
    }
    
    next();
  };
};

