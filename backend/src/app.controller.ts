import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request, @Res() response: Response) {
    if (process.env.NODE_ENV === 'production') {
      response.send('Postify!');
    } else {
      response.redirect('/graphql');
    }
  }

  @Get('/healthz')
  getHealthz(): Record<string, any> {
    return this.appService.getHealthz();
  }
}
