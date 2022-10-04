import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Compra from './entities/compra.entity';
import { CompraController } from './compra.controller';
import { CompraService } from './compra.service';

@Module({
    imports: [TypeOrmModule.forFeature([Compra])],
    controllers: [CompraController],
    providers: [CompraService],
})
export class CompraModule {}
