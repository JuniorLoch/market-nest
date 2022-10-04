import { IsNumber, IsString, IsUppercase } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
    @ApiProperty()
    @IsUppercase()
    estado: string;

    @ApiProperty()
    @IsString()
    cidade: string;

    @ApiProperty()
    @IsString()
    endereco: string;

    @ApiProperty()
    @IsNumber()
    numero: number;
}
