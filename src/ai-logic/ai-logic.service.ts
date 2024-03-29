import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable, pipe, map } from 'rxjs';
import * as fs from 'fs';
import * as FormData from 'form-data'
import { ItemService } from '../item/item.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AiLogicService {
    constructor(
        private httpService: HttpService,
        private itemService: ItemService,
        private prismaService: PrismaService
    ) { }

    async checkFunc() {
        const response = await this.httpService.get('').toPromise();
        console.log(response.data);
    }

    async getTagsFromApi(url: string, imageId: string): Promise<any> {
        try {
            const response = await this.httpService.axiosRef.get(url, {
                headers: {
                    authorization: `${authHeader}`
                },
                params: {
                    image_upload_id: imageId
                }
            })
            console.log(JSON.stringify(response.data));
            console.log(JSON.stringify(response.data.result));
            return await this.itemService.getItemsAndMaterialsForAi(response.data.result.tags[0].tag.en);
        }
        catch (error) {
            console.log(error);
        }
    }


    async sendImageToApi(url: string, image: Express.Multer.File) {
        console.log(image.path)
        const formData = new FormData();
        const imageStream = fs.readFileSync(image.path)

        formData.append('image', imageStream, image.originalname)

        try {
            const response = await this.httpService.axiosRef.post(url, formData, {
                headers: {
                    authorization: `${authHeader}`,
                    'Content-Type': `multipart/form-data; boundary}`,
                    'accept': 'application/json'
                }
            });
            const uploadId = response.data.result.upload_id;
            console.log('gijdanul Xasbik')
            console.log(uploadId)

            return await this.getTagsFromApi(`https://api.imagga.com/v2/tags`, uploadId);

        } catch (error) {
            console.log(error);
        }

    }

}
