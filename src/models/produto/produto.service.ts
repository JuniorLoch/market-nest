import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dtos/create-produto.dto';
import { UpdateProdutoDto } from './dtos/update-produto.dto';
import Produto from './entities/produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private readonly repository: Repository<Produto>,
    ) {}

    private returnStatus;

    /**
     *  Verifica a existência da entidade no banco pelo ID informado, caso exista a entidade é
     *  retornada, caso contrário lança um erro
     *
     *  Somente depois de implementar esse método que percebi que ele faz exatamente a mesma coisa
     *  que this.repository.findOneByOrFail(), útil para ter a mensagem em português no retorno
     * @date 2022-09-29
     * @param { number } produto id da entidade
     */
    private async verifyExistence(produto: number | CreateProdutoDto) {
        let tproduto;
        if (typeof produto == 'number') {
            tproduto = await this.repository.findOneBy({ id: produto });
        } else {
            tproduto = await this.repository.findOneBy({
                nome: produto.nome,
                valorUnitario: produto.valorUnitario,
            });
        }

        if (typeof produto == 'number' && !tproduto) {
            throw new NotFoundException(
                `produto ${produto ? 'com ID: ' + produto : ''} não encontrado`,
            );
        } else {
            return tproduto;
        }
    }

    async findOrCreateByProduct(produto: CreateProdutoDto): Promise<Produto> {
        const tproduto = await this.verifyExistence(produto);
        if (!tproduto) {
            return this.create(produto);
        } else {
            return tproduto;
        }
    }

    async findAll() {
        const tProdutos = await this.repository.find();
        if (!tProdutos) {
            this.returnStatus = 0;
        } else {
            this.returnStatus = 1;
        }

        return { status: this.returnStatus, produtos: tProdutos };
    }

    async findOne(id: number) {
        const tProduto = await this.verifyExistence(id);

        return tProduto;
    }

    async create(Produto: CreateProdutoDto) {
        const tProduto = this.repository.create(Produto);
        return this.repository.save(tProduto);
    }

    async update(id: number, Produto: UpdateProdutoDto) {
        const tProduto = await this.repository.preload({
            id,
            ...Produto,
        });

        if (!tProduto) {
            throw new NotFoundException(`Produto com ID: ${id} não encontrado`);
        }

        return this.repository.save(tProduto);
    }

    async remove(id: number) {
        const tProduto = await this.verifyExistence(id);
        return this.repository.remove(tProduto);
    }
}
