import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { prisma } from '../lib/prisma';

// Extend Express Request to include user info
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
      clerkUserId?: string;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the session token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token with Clerk
    const session = await (clerkClient.sessions as any).verifySession(token);

    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Get user details from Clerk
    const clerkUser = await clerkClient.users.getUser(session.userId);
    
    // Sync user to database
    const user = await prisma.user.upsert({
      where: { clerkId: clerkUser.id },
      update: {
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName || null,
        lastName: clerkUser.lastName || null,
        role: (clerkUser.publicMetadata?.role as any) || 'STUDENT',
      },
      create: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName || null,
        lastName: clerkUser.lastName || null,
        role: (clerkUser.publicMetadata?.role as any) || 'STUDENT',
      },
    });
    
    // Attach user info to request
    req.userId = user.id;
    req.clerkUserId = clerkUser.id;
    req.userRole = (clerkUser.publicMetadata?.role as string) || 'student';

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};
