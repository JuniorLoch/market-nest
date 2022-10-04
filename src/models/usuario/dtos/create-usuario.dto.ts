import { Type } from 'class-transformer';
import { IsObject, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import Endereco from 'src/models/endereco/entities/endereco.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEnderecoDto } from 'src/models/endereco/dtos/create-endereco.dto';

export class CreateUsuarioDto {
    @ApiProperty()
    @IsString()
    readonly nome: string;

    @ApiProperty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsOptional()
    @IsPhoneNumber('BR')
    readonly telefone: string;

    @ApiProperty({ type: CreateEnderecoDto })
    @IsOptional()
    @IsObject()
    @Type(() => Endereco)
    readonly endereco: Endereco;
}
