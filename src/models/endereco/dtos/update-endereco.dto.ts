import { CreateEnderecoDto } from './create-endereco.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {}
