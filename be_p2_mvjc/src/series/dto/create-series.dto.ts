
//• id: clave primaria auto numérica, INT PRIMARY KEY AUTO_INCREMENT
//• id_pais: entero, INT Llave foránea de la tabla paises
//• titulo: cadena de 250 caracteres, VARCHAR(250)
//• sinopsis  : cadena de 5000 caracteres, VARCHAR(5000)
//• director: cadena de 100 caracteres, VARCHAR(100)
//• temporadas: entero, INT

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Paise } from "src/paises/entities/paise.entity";

//• fecha_estreno: fecha, DATE
export class CreateSeriesDto {

    @ApiProperty()
    @Type(() => Number)
    @IsDefined({ message: "El campo idPais debe estar definido" })
    @IsInt({ message: "El campo idPais debe ser un número entero" })
    readonly idPais: Paise['id']

    @ApiProperty()
    @IsNotEmpty({ message: "El campo titulo no puede estar vacío" })
    @IsString({ message: "El campo titulo debe ser de tipo cadena" })
    @MaxLength(250, { message: "El campo titulo no puede exceder los 250 caracteres" })
    readonly titulo: string;

    @ApiProperty()
    @IsNotEmpty({ message: "El campo sinopsis no puede estar vacío" })
    @IsString({ message: "El campo sinopsis debe ser de tipo cadena" })
    @MaxLength(5000, { message: "El campo sinopsis no puede exceder los 5000 caracteres" })
    readonly sinopsis: string;

    @ApiProperty()
    @IsNotEmpty({ message: "El campo director no puede estar vacío" })
    @IsString({ message: "El campo director debe ser de tipo cadena" })
    @MaxLength(100, { message: "El campo director no puede exceder los 100 caracteres" })
    readonly director: string;

    @ApiProperty()
    @IsDefined({ message: "El campo temporadas debe estar definido" })
    @IsInt({ message: "El campo temporadas debe ser un número entero" })
    readonly temporadas: number;

    @ApiProperty()
    @IsDefined({ message: "El campo fechaEstreno debe estar definido" })
    @IsString({ message: "El campo fechaEstreno debe ser de tipo cadena" })
    @IsDateString({}, { message: "El campo fechaEstreno debe ser una fecha válida" })
    readonly fechaEstreno: Date;
}



