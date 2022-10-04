import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './models/usuario/usuario.module';
import { EnderecoModule } from './models/endereco/endereco.module';
import { CompraModule } from './models/compra/compra.module';
import { ProdutoModule } from './models/produto/produto.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

console.log(envFilePath);

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath, isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        // Colocar aqui todos os modulos das entidades do banco de dados
        UsuarioModule,
        EnderecoModule,
        CompraModule,
        ProdutoModule,
    ],
    controllers: [AppController],

    providers: [AppService],
})
export class AppModule {}
