import { Series } from 'src/series/entities/series.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
//id y descripcion (VARCHAR 30).
@Entity('paises')
export class Paise {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column('varchar', { length: 30 })
    descripcion: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    fechaCreacion: Date;

    @UpdateDateColumn({ name: 'fecha_modificacion' })
    fechaModificacion: Date;

    @DeleteDateColumn({ name: 'fecha_eliminacion' })
    fechaEliminacion: Date;

    @OneToMany(() => Series, (series) => series.pais)
    series: Series[];

}
