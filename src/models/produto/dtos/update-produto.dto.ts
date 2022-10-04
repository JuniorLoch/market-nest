import { CreateProdutoDto } from './create-produto.dto';
import { PartialType } from '@nestjs/swagger';

// TEMPORARIO - alterar para Partialtypes quando for trabalhar com o swagger
export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {}
