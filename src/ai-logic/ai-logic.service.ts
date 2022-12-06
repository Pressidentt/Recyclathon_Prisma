import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiLogicService {
    constructor(
        private httpService: HttpService,
    ) { }

    async checkFunc() {
        const response = await this.httpService.get('').toPromise();
        console.log(response.data);
    }
}
