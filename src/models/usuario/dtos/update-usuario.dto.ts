import { CreateUsuarioDto } from './create-usuario.dto';
import { PartialType } from '@nestjs/swagger';

// TEMPORARIO - alterar para Partialtypes quando for trabalhar com o swagger
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
