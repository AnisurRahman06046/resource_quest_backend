import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  link: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
