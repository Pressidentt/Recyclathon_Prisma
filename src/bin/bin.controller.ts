import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BinService } from './bin.service';
import { CreateBinTypeDto } from './dto/create-bin-type.dto';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) {}

  @Post()
  async create(@Body() createBinDto: CreateBinDto) {
    return this.binService.createBin(createBinDto);
  }

  @Post()
  createBinType(@Body() createBinTypeDto: CreateBinTypeDto) {
    return this.binService.createBinType(createBinTypeDto);
  }

  @Get()
  findAll() {
    return this.binService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBinDto: UpdateBinDto) {
    return this.binService.update(+id, updateBinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binService.remove(+id);
  }
}