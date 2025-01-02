import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class signUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
