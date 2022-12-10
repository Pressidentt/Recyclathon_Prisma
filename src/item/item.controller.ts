import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post('item')
  async createItem(@Body() postData: {
    name: string,
    description: string,
    materialId: number,
  }) {
    const { name, description, materialId } = postData;
    return await this.itemService.createItem({
      name,
      description,
      material: {
        connect: {
          id: materialId
        }
      }
    });
  }

  @Post('material')
  async createMaterial(@Body() postData: {
    name: string,
  }) {
    const { name } = postData;
    return await this.itemService.createMaterial({
      name,
    });
  }

  @Get('item')
  async findAllItems() {
    return await this.itemService.itemFindAll();
  }

  @Get('material')
  async findAllMaterials() {
    return this.itemService.materialFindAll();
  }

  @Delete('item/:id')
  async deleteItem(@Param('id') id: number) {
    return await this.itemService.deleteItem(id);
  }

  @Delete('material/:id')
  async deleteMaterial(@Param('id') id: number) {
    return await this.itemService.deleteMaterial(id);
  }

}
