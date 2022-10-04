import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Endereco from './entities/endereco.entity';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';

@Module({
    imports: [TypeOrmModule.forFeature([Endereco])],
    controllers: [EnderecoController],
    providers: [EnderecoService],
    exports: [EnderecoService],
})
export class EnderecoModule {}
