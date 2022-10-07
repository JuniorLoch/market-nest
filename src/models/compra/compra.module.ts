import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Compra from './entities/compra.entity';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';
import { ProdutoModule } from '../produto/produto.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [TypeOrmModule.forFeature([Compra]), ProdutoModule, UsuarioModule],
    controllers: [CompraController],
    providers: [CompraService],
})
export class CompraModule {}
