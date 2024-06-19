import { IsString } from 'class-validator';

export class User {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
