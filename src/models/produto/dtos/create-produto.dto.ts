import {
    IsBoolean,
    IsCurrency,
    IsNumber,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
    @ApiProperty()
    @IsBoolean()
    ativo: boolean;

    @ApiProperty()
    @IsString()
    nome: string;

    @ApiProperty()
    @IsCurrency()
    valorUnitario: string;

    @ApiProperty()
    @IsNumber()
    peso: number;
}
