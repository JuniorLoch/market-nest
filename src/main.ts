import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const configService: ConfigService = app.get(ConfigService);
    const port: number = configService.get<number>('SERVER_PORT');

    //swagger setup
    const document = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle('Nest market backend')
            .setDescription('Simple boxfront api for sales')
            .build(),
    );

    SwaggerModule.setup('api', app, document);

    await app.listen(port, () => {
        console.log(
            '[Server listening]',
            configService.get<string>('BASE_URL'),
        );
    });
}
bootstrap();
