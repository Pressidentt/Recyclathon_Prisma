import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

const CURLAT = '40.41327'
const CURLONG = '49.85494'

// BIN and BINTYPE LOGIC

@Injectable()
export class BinService {
  constructor(
    private prisma: PrismaService
  ) { }

  async createBin(data: Prisma.BinCreateInput) {
    return await this.prisma.bin.create({ data });
  }

  async createBinType(data: Prisma.BinTypeCreateInput) {
    return await this.prisma.binType.create({ data });
  }

  async generateBinsReady() {
    const binTypes = await this.prisma.binType.findMany();
    for (let i = 0; i < binTypes.length; i++) {
      const arr = this.geoDataGeneratorReady();
      for (let j = 0; j < arr.length; j++) {
        let bin = await this.prisma.bin.create({
          data: {
            lat: arr[j].lat,
            long: arr[j].long,
            binType: {
              connect: {
                id: binTypes[i].id
              }
            },
          }
        }
        )
        console.log(bin);
      }
    }
  }

  geoDataGeneratorReady() {
    const lt = CURLAT;
    const lg = CURLONG;
    const arr = [];

    for (let i = 0; i < 5; i++) {
      let changeNumbersLt = Math.floor(Math.random() * 970) + 1;
      let changeNumbersLg = Math.floor(Math.random() * 970) + 1;
      let newLt = `${lt.slice(0, 5)}` + `${changeNumbersLt}`;
      let newLg = `${lg.slice(0, 5)}` + `${changeNumbersLg}`;
      let coordinates = {
        "lat": Number(newLt),
        "long": Number(newLg)
      }
      arr.push(coordinates);
    }
    console.log(arr);
    return arr;
  }

  async googleMaps(materialId: number) {
    let material = await this.prisma.material.findUnique({
      where: {
        id: materialId
      }
    });
    const binType = await this.prisma.binType.findUnique({
      where: {
        name: material.name
      }
    });
    return await this.prisma.bin.findMany({
      where: {
        binTypeId: binType.id
      }
    });
  }

  async binsDelete() {
    const bins = await this.prisma.bin.findMany();
    for (let i = 0; i < bins.length; i++) {
      await this.prisma.bin.delete({
        where: {
          id: bins[i].id
        }
      })
    }
  }

  async findAllBinTypes() {
    return await this.prisma.binType.findMany();
  }

  async findAllBins() {
    return await this.prisma.bin.findMany();
  }

  async deleteBin(id: number) {
    return await this.prisma.bin.delete({
      where: {
        id
      }
    });
  }

  async deleteBinType(id: number) {
    return await this.prisma.binType.delete({
      where: {
        id
      }
    });
  }
}
