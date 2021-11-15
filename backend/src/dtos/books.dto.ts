import { IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public maso: string;

  @IsString()
  public name: string;
  
  @IsString()
  public image: string;

  @IsString()
  @IsOptional()
  public user_id: string;
  
  @IsString()
  @IsOptional()
  public available: boolean;
}
