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

export class UpdateResourceDto {
  @IsOptional()
  title: string;

  @IsOptional()
  link: string;

  @IsOptional()
  isPublic: boolean;
}
