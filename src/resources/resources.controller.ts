import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { CreateResourceDto } from './dtos/resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private resourceService: ResourcesService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  async addResource(@Body() data: CreateResourceDto, @Request() req) {
    const payload = { ...data, user: req.user.sub };
    const result = await this.resourceService.addResource(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'Resource is added',
      data: result,
    };
  }

  //   get resources by user
  @Get('user/resource')
  @UseGuards(AuthGuard)
  async resourcesByUser(@Request() req) {
    const result = await this.resourceService.resourcesByUser(req.user.sub);
    return {
      status: HttpStatus.OK,
      message: 'Resources are fetched',
      data: result,
    };
  }

  //   remove resource by user
  @Delete('user/remove/:id')
  @UseGuards(AuthGuard)
  async removeResourceByUser(@Param('id') id: string, @Request() req) {
    const result = await this.resourceService.removeResource(req.user.sub, id);
    return {
      status: HttpStatus.OK,
      message: 'Resource is deleted',
      data: result,
    };
  }
}
