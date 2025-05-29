import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series } from './entities/series.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

//• id: clave primaria auto numérica, INT PRIMARY KEY AUTO_INCREMENT
//• id_pais: entero, INT Llave foránea de la tabla paises
//• titulo: cadena de 250 caracteres, VARCHAR(250)
//• sinopsis  : cadena de 5000 caracteres, VARCHAR(5000)
//• director: cadena de 100 caracteres, VARCHAR(100)
//• temporadas: entero, INT

export class SeriesService {
  constructor(@InjectRepository(Series) private seriesRepository: Repository<Series>) {}
    
  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const existe = await this.seriesRepository.findOneBy({ 
      idPais: createSeriesDto.idPais,
      titulo: createSeriesDto.titulo.trim(),
      director: createSeriesDto.director.trim(),
    });

    if (existe) {
      throw new ConflictException('la serie ya existe con ese título y director en el país especificado');
    }
    const serie = new Series();
    serie.idPais = createSeriesDto.idPais;
    serie.titulo = createSeriesDto.titulo.trim(); 
    serie.sinopsis = createSeriesDto.sinopsis.trim();
    serie.director = createSeriesDto.director.trim();
    serie.temporadas = createSeriesDto.temporadas;
    serie.fechaEstreno = createSeriesDto.fechaEstreno;
    return this.seriesRepository.save(serie);
  }

  async findAll(): Promise<Series[]> { //hace que muestre todas las series
    return this.seriesRepository.find({
      relations: {pais: true}, 
      select: {
        id: true,
        titulo: true,
        sinopsis: true,
        director: true,
        temporadas: true,
        fechaEstreno: true,
        pais: { id: true, descripcion: true  }, 
      },
    });
    
  }

  async findOne(id: number): Promise<Series> {
    const serie = await this.seriesRepository.findOne({
    where: { id },
    relations: { pais: true }, // Carga la relación con el país
  });
    if (!serie) {
      throw new NotFoundException(`Serie con id ${id} no encontrada`);
    }
    return serie;
  }


  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    const serie = await this.findOne(id);
    Object.assign(serie, updateSeriesDto);
    return this.seriesRepository.save(serie);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    return this.seriesRepository. softRemove(serie);
  }
}


