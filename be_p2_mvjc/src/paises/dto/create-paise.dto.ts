//id y descripcion (VARCHAR 30).

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePaiseDto {

    @ApiProperty()
    @IsNotEmpty({ message: "El campo descripcion no puede estar vacío" })
    @IsString({ message: "El campo descripcion debe ser de tipo cadena" })
    @MaxLength(30, { message: "El campo descripcion no puede exceder los 30 caracteres" })
    readonly descripcion: string;
}
