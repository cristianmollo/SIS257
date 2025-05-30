//id y descripcion (VARCHAR 30).

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePaiseDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo descripcion no puede estar vacío' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo descripcion no puede exceder los 30 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty({
    description: 'Idioma principal del país',
    maxLength: 30,
  })
  @IsNotEmpty({ message: 'El campo idiomaPrincipal no puede estar vacío' })
  @IsString({ message: 'El campo idiomaPrincipal debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo idiomaPrincipal no puede exceder los 30 caracteres',
  })
  readonly idiomaPrincipal: string;
}
