import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from '../produto/dtos/create-produto.dto';
import { ProdutoService } from '../produto/produto.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import Compra from './entities/compra.entity';

@Injectable()
export class CompraService {
    constructor(
        @InjectRepository(Compra)
        private readonly repository: Repository<Compra>,
        private produtoService: ProdutoService,
        private usuarioService: UsuarioService,
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

    async create(compra: CreateCompraDto) {
        if (compra.produtos) {
            const tVendedor = await this.usuarioService.findOrCreateByUser(
                compra.vendedor,
            );
            const tCliente = await this.usuarioService.findOrCreateByUser(
                compra.cliente,
            );
            // console.log('Endereco no parâmetro');
            // console.log(compra.endereco);
            const produtos = await Promise.all(
                compra.produtos.map((produto) =>
                    this.produtoService.findOrCreateByProduct(produto),
                ),
            );
            // console.log('Resultado do método');
            // console.log(endereco);
            var tCompra = this.repository.create({
                ...compra,
                produtos,
                vendedor: tVendedor,
                cliente: tCliente,
            });
        } else {
            var tCompra = this.repository.create(compra);
        }
        //TEMPORARIO - verificar se é necessário o await antes do return
        return await this.repository.save(tCompra);
    }

    async update(id: number, compra: UpdateCompraDto) {
        this.verifyExistence(id);

        if (compra.produtos) {
            var tProduto = await Promise.all(
                compra.produtos.map((produto, index) => {
                    if (!produto.nome) {
                        throw new BadRequestException(
                            `nome do produto obrigatório (Posição ${index})`,
                            'O nome do produto é obrigatório para editar produtos diretamente',
                        );
                    }
                    return this.produtoService.findOrCreateByProduct(produto);
                }),
            );
        }

        const tCompra = await this.repository.preload({
            id,
            ...compra,
            produtos: tProduto,
        });

        if (!tCompra) {
            throw new NotFoundException(`Compra com ID: ${id} não encontrado`);
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
