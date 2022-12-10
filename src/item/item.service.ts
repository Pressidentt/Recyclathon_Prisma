import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateItemDto } from './dto/update-item.dto';


// ITEM AND MATERIAL LOGIC

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService
  ) { }
  async createItem(data: Prisma.ItemCreateInput) {
    return await this.prisma.item.create({ data });
  }

  async createMaterial(data: Prisma.MaterialCreateInput) {
    return await this.prisma.material.create({ data });
  }

  async getPreparedItems(name: string) {
    return await this.prisma.item.findMany({
      include: {
        material: true
      }
    });
  }

  async getItemsAndMaterialsForAi(item_quess: string) {
    console.log('DOshel go itema')
    console.log('item_quess: ', item_quess);
    const items = await this.prisma.item.findMany({
      include: {
        material: true
      }
    });

    const ar = item_quess.toLowerCase().split(' ');
    console.log('ar: ', ar);
    // Проверяю есть ли в названии предмета слово, которое ввел пользователь
    for (let i = 0; i < items.length; i++) {
      if (ar.includes(items[i].name.toLowerCase())) {
        return items[i]; 
        }
      }
      console.log('YA NE srabotal')
    }

  // Testing functions
  async itemFindAll() {
      return await this.prisma.item.findMany();
    }

  async materialFindAll() {
      return await this.prisma.material.findMany();
    }

  async deleteItem(id: number) {
      return await this.prisma.item.delete({
        where: {
          id: id
        }
      });
    }

  async deleteMaterial(id: number) {
      return await this.prisma.material.delete({
        where: {
          id: id
        }
      });
    }
  }
