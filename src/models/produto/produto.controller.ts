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
import { CreateProdutoDto } from './dtos/create-produto.dto';
import { UpdateProdutoDto } from './dtos/update-produto.dto';
import { ProdutoService } from './produto.service';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
    @Inject(ProdutoService)
    private readonly service: ProdutoService;

    @Get('/listar')
    async listarTodos() {
        return await this.service.findAll();
    }

    @Get('/:id')
    async listarUm(@Param('id', ParseIntPipe) id: number) {
        return await this.service.findOne(id);
    }

    @Post()
    async criar(@Body() produto: CreateProdutoDto) {
        return await this.service.create(produto).catch((err) => {
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
        @Body() produto: UpdateProdutoDto,
    ) {
        return this.service.update(id, produto);
    }

    @Delete('/:id')
    async remover(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
