import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
    @Column()
    cliente: string;

    @ApiProperty()
    @Column()
    vendedor: string;
}

export default Compra;
