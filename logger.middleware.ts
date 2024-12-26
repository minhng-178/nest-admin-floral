import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, url } = req;
    res.on('finish', () => {
      Logger.log(
        `${res.statusCode} {${baseUrl}${url},${method}}`,
        LoggerMiddleware.name,
      );
    });

    next();
  }
}
