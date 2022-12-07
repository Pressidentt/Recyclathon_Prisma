import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, Observable, pipe, map } from 'rxjs';
import * as fs from 'fs';
import * as FormData from 'form-data'

const PUBLIC_KEY = ''
const PRIVATE_KEY = ''
const authHeader = 'Basic YWNjXzBiMDdjNjMwZTg0OGMzNDo4YzlhMjA3YmJhMzFiMGY5ZDQwOWY4NTY5ZWYyMmI5ZQ=='
const t = 'curl --user "acc_0b07c630e848c34:8c9a207bba31b0f9d409f8569ef22b9e" "https://api.imagga.com/v2/tags?image_url=https://imagga.com'
'static/images/tagging/wind-farm-538576_640.jpg"'


@Injectable()
export class AiLogicService {
    constructor(
        private httpService: HttpService,
    ) { }

    async checkFunc() {
        const response = await this.httpService.get('').toPromise();
        console.log(response.data);
    }

    async getTagsFromApi(url: string, imageId: string) {
        const response = await this.httpService.get(url, {
            headers: {
                authorization: `${authHeader}`
            },
            params: {
                image_upload_id: imageId
            }
        })
        return await (lastValueFrom(response)).then(res => res.data.result.tags[0].tag.en)
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


            return {
                message: 'Upload successful',
                uploadId: uploadId
            }
        } catch (error) {
            console.log(error);
        }

        // console.log(`image id is ${imageId}`)
        // const objectFromApi = await this.getTagsFromApi(`https://api.imagga.com/v2/tags`, imageId)
        // console.log(`image id is ${imageId}, object from api is ${objectFromApi}`)
    }

}
