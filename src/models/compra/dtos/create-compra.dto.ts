import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompraDto {
    @ApiProperty()
    @IsBoolean()
    readonly concluido: boolean;

    @ApiProperty()
    @IsString()
    readonly cliente: string;

    @ApiProperty()
    @IsString()
    readonly vendedor: string;
}
