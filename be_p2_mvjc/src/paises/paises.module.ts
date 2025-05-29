import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paise } from './entities/paise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paise])],
  controllers: [PaisesController],
  providers: [PaisesService],
})
export class PaisesModule {}
