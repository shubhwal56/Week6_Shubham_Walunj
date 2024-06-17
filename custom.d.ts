declare namespace Express {
  interface Request {
      user?: {
          id: number;
          username: string;
          email: string;  
          isAdmin?: boolean;
      };
  }
}
