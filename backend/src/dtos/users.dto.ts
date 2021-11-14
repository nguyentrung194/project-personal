import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
  
  @IsString()
  public name: string;

  @IsString()
  public mssv: string;

  @IsArray()
  public books: string[];
}
