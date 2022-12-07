import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBinDto {

    @IsString()
    @IsNotEmpty()
    long: string;

    @IsString()
    @IsNotEmpty()
    lat: string;

    @IsNumber()
    @IsNotEmpty()
    binTypeId: number;

    @IsNumber()
    @IsNotEmpty()
    materialId: number;

}
