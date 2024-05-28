import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  id: number;
  
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;  
  
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
    
  @IsString({ message: 'Email must be a string' })
  email: string;

  createdAt: Date;
  updatedAt: Date;
}