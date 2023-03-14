import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

//Middleware é uma função que recebe o request, o response e o next (caso seja validado o usuário)

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload; //forçando tipo da variável

    request.user = { //necessário sobreecrever tipo (modificar o funcionamento da biblioteca, sobreecrever tipos)
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
