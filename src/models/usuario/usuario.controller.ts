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
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
    @Inject(UsuarioService)
    private readonly service: UsuarioService;

    @Get('/listar')
    async listarTodos() {
        return await this.service.findAll();
    }

    @Get('/:id')
    async listarUm(@Param('id', ParseIntPipe) id: number) {
        return await this.service.findOne(id);
    }

    @Post()
    async criar(@Body() usuario: CreateUsuarioDto) {
        return await this.service.create(usuario).catch((err) => {
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
        @Body() usuario: UpdateUsuarioDto,
    ) {
        return this.service.update(id, usuario);
    }

    @Delete('/:id')
    async remover(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
