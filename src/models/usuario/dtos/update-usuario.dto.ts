import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    readonly ativo: boolean;
}
