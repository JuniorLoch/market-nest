import { CreateEnderecoDto } from './create-endereco.dto';
import { PartialType } from '@nestjs/swagger';

// TEMPORARIO - alterar para Partialtypes quando for trabalhar com o swagger
export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {}
