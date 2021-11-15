import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
  
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public mssv: string;

  @IsArray()
  @IsOptional()
  public books: string[];
}
