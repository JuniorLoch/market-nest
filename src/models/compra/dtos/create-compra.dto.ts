import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import Produto from 'src/models/produto/entities/produto.entity';
import { Type } from 'class-transformer';
import { CreateProdutoDto } from 'src/models/produto/dtos/create-produto.dto';
import Usuario from 'src/models/usuario/entities/usuario.entity';
import { CreateUsuarioDto } from 'src/models/usuario/dtos/create-usuario.dto';

export class CreateCompraDto {
    @ApiProperty()
    @IsBoolean()
    readonly concluido: boolean;

    @ApiProperty({ type: CreateUsuarioDto })
    @IsObject()
    @Type(() => Usuario)
    readonly cliente: Usuario;

    @ApiProperty({ type: CreateUsuarioDto })
    @IsObject()
    @Type(() => Usuario)
    readonly vendedor: Usuario;

    @ApiProperty({ type: CreateProdutoDto })
    @IsOptional()
    @IsObject({ each: true })
    @Type(() => Produto)
    readonly produtos: Produto[];
}
