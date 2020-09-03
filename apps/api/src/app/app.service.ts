import { Injectable } from '@nestjs/common';
import { Message } from '@iowa/api-interfaces';

@Injectable()
export class AppService {
  // placeholder example from NestJS
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getWorkspaceFileTree(): any {

  }
}
