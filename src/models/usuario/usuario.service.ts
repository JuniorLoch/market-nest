import {
    Injectable,
    NotFoundException,
    BadRequestException,
    forwardRef,
    Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateEnderecoDto } from '../endereco/dtos/create-endereco.dto';
import { EnderecoService } from '../endereco/endereco.service';
import Endereco from '../endereco/entities/endereco.entity';
import { CreateUsuarioDto } from './dtos/create-usuario.dto';
import { UpdateUsuarioDto } from './dtos/update-usuario.dto';
import Usuario from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly repository: Repository<Usuario>,
        private enderecoService: EnderecoService,
    ) {}

    private returnStatus;

    /**
     *  Verifica a existência da entidade no banco pelo ID informado, caso exista a entidade é
     *  retornada, caso contrário lança um erro
     *
     *  Somente depois de implementar esse método que percebi que ele faz exatamente a mesma coisa
     *  que this.repository.findOneByOrFail(), útil para ter a mensagem em português no retorno
     * @date 2022-09-29
     * @param { number } id id da entidade
     */
    private async verifyExistence(id: number) {
        const tUsuario = await this.repository.findOneBy({ id });
        if (!tUsuario) {
            throw new NotFoundException(`Usuário com ID: ${id} não encontrado`);
        } else {
            return tUsuario;
        }
    }

    async findAll() {
        const tUsuarios = await this.repository.find();
        if (!tUsuarios) {
            this.returnStatus = 0;
        } else {
            this.returnStatus = 1;
        }
        return { status: this.returnStatus, usuarios: tUsuarios };
    }
    async findOne(id: number) {
        const tUsuario = await this.verifyExistence(id);
        return tUsuario;
    }

    async create(usuario: CreateUsuarioDto) {
        if (usuario.endereco) {
            // console.log('Endereco no parâmetro');
            // console.log(usuario.endereco);
            var endereco = await this.enderecoService.findOrCreateByAddress(
                usuario.endereco,
            );
            // console.log('Resultado do método');
            // console.log(endereco);
            var tUsuario = this.repository.create({ ...usuario, endereco });
        } else {
            var tUsuario = this.repository.create(usuario);
        }
        // console.log('tUsuário');
        // console.log(tUsuario);
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tUsuario);
    }

    async update(id: number, usuario: UpdateUsuarioDto) {
        if (usuario.endereco) {
            const tEndereco = <CreateEnderecoDto>usuario.endereco;
            if (!tEndereco.endereco) {
                throw new BadRequestException(
                    'endereço obrigatório',
                    'O endereço é obrigatório para editar enderecos de usuários diretamente',
                );
            }
            var endereco = await this.enderecoService.findOrCreateByAddress(
                tEndereco,
            );
        }
        const tUsuario = await this.repository.preload({
            id,
            ...usuario,
            endereco: endereco,
        });

        if (!tUsuario) {
            throw new NotFoundException(`Usuário com ID: ${id} não encontrado`);
        }

        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tUsuario);
    }

    async remove(id: number) {
        const tUsuario = await this.verifyExistence(id);
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.remove(tUsuario);
    }
}
