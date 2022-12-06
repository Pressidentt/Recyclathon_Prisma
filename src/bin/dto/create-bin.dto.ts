import { applyIsOptionalDecorator } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBinDto {

    @IsString()
    @IsNotEmpty()
    long: string;

    @IsString()
    @IsNotEmpty()
    lat: string;

    }
