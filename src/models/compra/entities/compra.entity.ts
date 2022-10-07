import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import Usuario from 'src/models/usuario/entities/usuario.entity';
import Produto from 'src/models/produto/entities/produto.entity';

@Entity('compra')
class Compra {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    concluido: boolean;

    @ApiProperty()
    @Column()
    valorTotal: number;

    @ApiProperty()
    @ManyToOne(() => Usuario, {
        eager: true,
    })
    cliente: Usuario;

    @ApiProperty()
    @ManyToOne(() => Usuario, {
        eager: true,
    })
    vendedor: Usuario;

    @ApiProperty()
    @ManyToMany(() => Produto, {
        cascade: true,
        eager: true,
    })
    @JoinTable()
    produtos: Produto[];
}

export default Compra;
