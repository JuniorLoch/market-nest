import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('produto')
class Produto {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    ativo: boolean;

    @ApiProperty()
    @Column({ unique: true })
    nome: string;

    @ApiProperty()
    @Column()
    valorUnitario: string;

    @ApiProperty()
    @Column({ nullable: true })
    peso: number;
}
export default Produto;
