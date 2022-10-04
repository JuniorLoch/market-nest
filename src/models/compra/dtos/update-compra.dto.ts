import { PartialType } from '@nestjs/swagger';
import { CreateCompraDto } from './create-compra.dto';

// TEMPORARIO - alterar para Partialtypes quando for trabalhar com o swagger
export class UpdateCompraDto extends PartialType(CreateCompraDto) {}
