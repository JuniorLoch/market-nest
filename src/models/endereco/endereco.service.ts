import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnderecoDto } from './dtos/create-endereco.dto';
import { UpdateEnderecoDto } from './dtos/update-endereco.dto';
import Endereco from './entities/endereco.entity';

@Injectable()
export class EnderecoService {
    constructor(
        @InjectRepository(Endereco)
        private readonly repository: Repository<Endereco>,
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
    private async verifyExistence(endereco: CreateEnderecoDto | number) {
        let tEndereco;
        if (typeof endereco == 'number') {
            var id = endereco;
            tEndereco = await this.repository.findOneBy({ id: endereco });
        } else {
            tEndereco = await this.repository.findOneBy({
                numero: endereco.numero,
                estado: endereco.estado,
                cidade: endereco.cidade,
            });
        }

        if (typeof endereco == 'number' && !tEndereco) {
            throw new NotFoundException(
                `Endereco ${id ? 'com ID: ' + id : ''} não encontrado`,
            );
        } else {
            return tEndereco;
        }
    }

    async findOrCreateByAddress(endereco: CreateEnderecoDto) {
        const tEndereco = await this.verifyExistence(endereco);
        if (!tEndereco) {
            return this.create(endereco);
        } else {
            return tEndereco;
        }
    }

    async findAll() {
        const tEnderecos = await this.repository.find();
        if (!tEnderecos) {
            this.returnStatus = 0;
        } else {
            this.returnStatus = 1;
        }
        return { status: this.returnStatus, enderecos: tEnderecos };
    }

    async findOne(id: number) {
        const tEndereco = await this.verifyExistence(id);
        return tEndereco;
    }

    async create(Endereco: CreateEnderecoDto) {
        const tEndereco = this.repository.create(Endereco);
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tEndereco);
    }

    async update(id: number, Endereco: UpdateEnderecoDto) {
        const tEndereco = await this.repository.preload({
            id,
            ...Endereco,
        });
        if (!tEndereco) {
            throw new NotFoundException(
                `Endereco com ID: ${id} não encontrada`,
            );
        }
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tEndereco);
    }

    async remove(id: number) {
        const tEndereco = await this.verifyExistence(id);
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.remove(tEndereco);
    }
}
