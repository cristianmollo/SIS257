import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { Paise } from './entities/paise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class PaisesService {
  constructor(@InjectRepository(Paise) private paisesRepository: Repository<Paise>) {}
  
  async create(createPaiseDto: CreatePaiseDto): Promise<Paise> {
    const existe = await this.paisesRepository.findOneBy({ 
      descripcion: createPaiseDto.descripcion.trim() 
    });
    if (existe) {
      throw new ConflictException('El país ya existe');
    }
    const pais = new Paise();
    pais.descripcion = createPaiseDto.descripcion.trim();
    return this.paisesRepository.save(pais);
  }

  async findAll(): Promise<Paise[]> {
    return this.paisesRepository.find();
  }

  async findOne(id: number): Promise<Paise> {
    const pais = await this.paisesRepository.findOneBy({ id });
    if (!pais) { 
      throw new ConflictException(`El país con id ${id} no existe`);
    }
    return pais;
  }

  async update(id: number, updatePaiseDto: UpdatePaiseDto): Promise<Paise> {
    const pais = await this.findOne(id);
    const paisUpdate = Object.assign(pais, updatePaiseDto);
    return this.paisesRepository.save(paisUpdate);
  }

  async remove(id: number){
    const pais = await this.findOne(id);
    return this.paisesRepository.softRemove(pais);
  }
}
