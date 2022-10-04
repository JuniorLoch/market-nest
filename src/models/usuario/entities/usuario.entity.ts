import { IsOptional } from 'class-validator';
import Endereco from 'src/models/endereco/entities/endereco.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pessoa')
class Usuario {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    ativo: boolean;

    @ApiProperty()
    @Column()
    nome: string;

    @ApiProperty()
    @Column({ nullable: true })
    email: string;

    @ApiProperty()
    @Column({ nullable: true })
    telefone: string;

    @ApiProperty({ type: Endereco })
    @JoinTable()
    @ManyToOne(() => Endereco, (endereco) => endereco.residentes, {
        cascade: true,
        eager: true,
    })
    endereco: Endereco;
}

export default Usuario;
