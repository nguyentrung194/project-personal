import { IsEmail, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public maso: string;

  @IsString()
  public name: string;
  
  @IsString()
  public image: string;

  @IsString()
  public user_id: string;
  
  @IsString()
  public available: boolean;
}
