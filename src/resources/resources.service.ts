import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource } from 'src/schemas/resource.schema';
import { CreateResourceDto } from './dtos/resource.dto';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<Resource>,
  ) {}

  //   add resource
  async addResource(payload: CreateResourceDto) {
    const result = await this.resourceModel.create(payload);
    if (!result)
      throw new HttpException('Failed to add', HttpStatus.BAD_REQUEST);
  }
}