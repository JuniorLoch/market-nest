import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import Compra from './entities/compra.entity';

@Injectable()
export class CompraService {
    constructor(
        @InjectRepository(Compra)
        private readonly repository: Repository<Compra>,
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
        const tCompra = await this.repository.findOneBy({ id });
        if (!tCompra) {
            throw new NotFoundException(`Compra com ID: ${id} não encontrada`);
        } else {
            return tCompra;
        }
    }

    async findAll() {
        const tCompras = await this.repository.find();
        if (!tCompras) {
            this.returnStatus = 0;
        } else {
            this.returnStatus = 1;
        }

        return { status: this.returnStatus, compras: tCompras };
    }

    async findOne(id: number) {
        const tCompra = await this.verifyExistence(id);

        return tCompra;
    }

    async create(Compra: CreateCompraDto) {
        const tCompra = this.repository.create(Compra);
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tCompra);
    }

    async update(id: number, Compra: UpdateCompraDto) {
        const tCompra = await this.repository.preload({
            id,
            ...Compra,
        });

        if (!tCompra) {
            throw new NotFoundException(`Compra com ID: ${id} não encontrada`);
        }

        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tCompra);
    }

    async remove(id: number) {
        const tCompra = await this.verifyExistence(id);
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.remove(tCompra);
    }
}
