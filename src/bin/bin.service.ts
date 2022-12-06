import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';

@Injectable()
export class BinService {
  constructor(
    private prisma: PrismaService
  ) { }

  async createBin(data: Prisma.BinCreateInput) {
    return this.prisma.bin.create({ data });
  }

  async createBinType(data: Prisma.BinTypeCreateInput) {
    return this.prisma.binType.create({ data });
  }

  findAllBinTypes() {
    return this.prisma.binType.findMany();
  }

  update(id: number, updateBinDto: UpdateBinDto) {
    return `This action updates a #${id} bin`;
  }

  remove(id: number) {
    return `This action removes a #${id} bin`;
  }
}
