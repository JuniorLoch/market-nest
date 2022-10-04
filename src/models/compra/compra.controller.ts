import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import { CompraService } from './compra.service';

@ApiTags('compra')
@Controller('compra')
export class CompraController {
    @Inject(CompraService)
    private readonly service: CompraService;

    @Get('/listar')
    async listarTodos() {
        return await this.service.findAll();
    }

    @Get('/:id')
    async listarUm(@Param('id', ParseIntPipe) id: number) {
        return await this.service.findOne(id);
    }

    @Post()
    async criar(@Body() compra: CreateCompraDto) {
        return await this.service.create(compra).catch((err) => {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: [err?.message],
                },
                HttpStatus.BAD_REQUEST,
            );
        });
    }

    @Put('/:id')
    async atualizar(
        @Param('id', ParseIntPipe) id: number,
        @Body() compra: UpdateCompraDto,
    ) {
        return this.service.update(id, compra);
    }

    @Delete('/:id')
    async remover(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
