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
import { CreateEnderecoDto } from './dtos/create-endereco.dto';
import { UpdateEnderecoDto } from './dtos/update-endereco.dto';
import { EnderecoService } from './endereco.service';

@ApiTags('endereco')
@Controller('endereco')
export class EnderecoController {
    @Inject(EnderecoService)
    private readonly service: EnderecoService;

    @Get('/listar')
    async listarTodos() {
        return await this.service.findAll();
    }

    @Get('/:id')
    async listarUm(@Param('id', ParseIntPipe) id: number) {
        return await this.service.findOne(id);
    }

    @Post()
    async criar(@Body() endereco: CreateEnderecoDto) {
        return await this.service.create(endereco).catch((err) => {
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
        @Body() endereco: UpdateEnderecoDto,
    ) {
        return this.service.update(id, endereco);
    }

    @Delete('/:id')
    async remover(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
