import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findAdmin(email, password);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async signUp(email: string, name: string, password: string) {
    if (await this.usersService.findAdmin(email, password)) {
      throw new UnauthorizedException('User already exists');
    }

    return await this.usersService.createUser(email, name, password);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findAdmin(email, password);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
