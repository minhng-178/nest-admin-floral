import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    return {
      id: randomUUID(),
      email,
      name,
      password,
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findAdmin(email: string, password: string): Promise<User | undefined> {
    if (email === 'admin@gmail.com' && password === 'admin') {
      return {
        id: randomUUID(),
        email,
        name: 'Admin',
        password,
        role: Role.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return undefined;
  }

  async findRoles(username: string): Promise<Role[]> {
    if (username === 'admin') {
      return [Role.ADMIN];
    }
    return [Role.USER];
  }
}
