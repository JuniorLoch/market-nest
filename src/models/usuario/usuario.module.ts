import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoModule } from '../endereco/endereco.module';

import Usuario from './entities/usuario.entity';

import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]), EnderecoModule],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})
export class UsuarioModule {}
