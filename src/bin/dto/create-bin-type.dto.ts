import { IsNotEmpty, IsString } from "class-validator";

export class CreateBinTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}