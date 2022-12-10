import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Bin } from '@prisma/client';
import { BinService } from './bin.service';

@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) { }

  @Post('bin')
  async createBin(@Body() postData: {
    long: number, lat: number,
    binTypeId: number
  }) {
    const { long, lat, binTypeId} = postData;
    return await this.binService.createBin(
      {
        long,
        lat,
        binType: {
          connect: {
            id: binTypeId
          }
        },
      }
    );
  }

  @Post('binType')
  async createBinType(@Body() postData: {
    name: string
  }) {
    const { name } = postData;
    return await this.binService.createBinType({
      name
    });
  }

  @Post('bin-generate')
  async generateBinsReady() {
    return await this.binService.generateBinsReady();
  }

  @Post('google-maps')
  async googleMaps(@Body() postData: {
    materialId: number
  }) {
    const { materialId } = postData;
    return await this.binService.googleMaps(materialId);
  }
  @Get('binType')
  async findAllBinTypes() {
    return await this.binService.findAllBinTypes();
  }

  @Get('bin')
  async findAllBins() {
    return await this.binService.findAllBins();
  }

  @Delete('bin/:id')
  async deleteBin(@Param('id') id: number) {
    return await this.binService.deleteBin(id);
  }

  @Delete('binType/:id')
  async deleteBinType(@Param('id') id: number) {
    return await this.binService.deleteBinType(id);
  }
  
  @Delete('delete-bin-all')
  async deleteAllBins() {
    return await this.binService.binsDelete();
  }
}
