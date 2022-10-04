import { IsOptional } from 'class-validator';
import Usuario from 'src/models/usuario/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('endereco')
class Endereco {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: true })
    estado: string;

    @ApiProperty()
    @Column({ nullable: true })
    cidade: string;

    @ApiProperty()
    @Column({ nullable: true })
    numero: number;

    @ApiProperty()
    @Column()
    endereco: string;

    @ApiProperty()
    @ManyToOne(() => Usuario, (usuario) => usuario.endereco)
    residentes: Usuario[];
}

export default Endereco;
